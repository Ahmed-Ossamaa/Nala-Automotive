


class BaseService {
  constructor(model) {
    this.model = model;
  }

  async findById(id, select = '') {
    try {
      const query = this.model.findById(id);
      if (select) query.select(select);
      return await query;
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter, select = '') {
    try {
      const query = this.model.findOne(filter);
      if (select) query.select(select);
      return await query;
    } catch (error) {
      throw error;
    }
  }

  async findAll(filter = {}, select = '', sort = '-createdAt') {
    try {
      return await this.model.find(filter).select(select).sort(sort);
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, data) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseService;
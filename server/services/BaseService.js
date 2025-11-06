


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
      throw new Error(`Error finding ${this.model.modelName}: ${error.message}`);
    }
  }

  async findOne(filter, select = '') {
    try {
      const query = this.model.findOne(filter);
      if (select) query.select(select);
      return await query;
    } catch (error) {
      throw new Error(`Error finding ${this.model.modelName}: ${error.message}`);
    }
  }

  async findAll(filter = {}, select = '', sort = '-createdAt') {
    try {
      return await this.model.find(filter).select(select).sort(sort);
    } catch (error) {
      throw new Error(`Error fetching ${this.model.modelName}s: ${error.message}`);
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error creating ${this.model.modelName}: ${error.message}`);
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
      throw new Error(`Error updating ${this.model.modelName}: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting ${this.model.modelName}: ${error.message}`);
    }
  }

  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      throw new Error(`Error counting ${this.model.modelName}s: ${error.message}`);
    }
  }
}

module.exports = BaseService;



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

  async findPaginated(filter = {}, options = {}) {
    const { page = 1, limit = 10, select = '', sort = '-createdAt' } = options;
    const take = Math.min(Number(limit), 100);
    const skip = (Number(page) - 1) * Number(take);

    try {
      const [data, total] = await Promise.all([
        this.model.find(filter).select(select).sort(sort).skip(skip).limit(Number(take)),
        this.model.countDocuments(filter)
      ]);

      return {
        data,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(take)),
          totalItems: total,
          limit: Number(take)
        }
      };
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
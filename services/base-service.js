class BaseService {
  constructor(model) {
    this.model = model
  }

  async save(object) {
    return this.model.insertMany(object)
  }

  async load() {
    return this.model.find()
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async findById(id) {
    return this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value })
  }

  async findOne(value) {
    return this.model.findOne({ value })
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object)
  }

  async query(obj) {
    return this.model.find(obj)
  }
}

module.exports = BaseService

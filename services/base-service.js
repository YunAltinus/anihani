class BaseService {
  constructor(model) {
    this.model = model
  }

  async save(object) {
    this.model.insertMany(object)
  }

  async load() {
    this.model.find()
  }

  async insert(object) {
    this.model.create(object)
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

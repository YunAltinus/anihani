const BaseService = require("./base-service")
const User = require("../models/User")
const schema = require("../lib/validation")
const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class UserService extends BaseService {
  async login(email, password) {
    const user = await this.findOne(email)

    const checkedPassword = await bcrypt.compare(password, user?.password)

    if (!user || !checkedPassword)
      throw createError(400, "Girilen email/şifre hatalıdır!")

    return user
  }

  async preSaveHashToPassword(user) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash

    return user
  }

  getTokenFromUserService(id) {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env

    const token = jwt.sign({ id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    })

    return token
  }

  async joiValidation(user) {
    return schema.validateAsync(user)
  }

  toJSON(user) {
    delete user["password"]
    delete user["createdAt"]
    delete user["updatedAt"]
    delete user["__v"]
    console.log("json", user)

    return user
  }
}

module.exports = new UserService(User)

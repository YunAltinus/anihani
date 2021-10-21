const BaseService = require("./base-service")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const schema = require("../lib/validation")
const bcrypt = require("bcrypt")

class UserService extends BaseService {
  getTokenFromUser(id) {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env

    const token = jwt.sign({ id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    })

    return token
  }

  async joiValidationForRegister(user) {
    return schema.validateAsync(user)
  }

  toJSON(user) {
    delete user._id
    delete user.password
    delete user.createdAt
    delete user.updatedAt
    delete user.__v

    return user
  }

  async login(email, password) {
    const user = await this.findOne({ email })

    const checkedPassword = await bcrypt.compare(password, user?.password)

    if (!user || !checkedPassword)
      throw createError(400, "Girilen email/şifre hatalıdır!")

    return user
  }
}

module.exports = new UserService(User)

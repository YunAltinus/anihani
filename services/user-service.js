const BaseServise = require("./base-service")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const bcrypt = require("bcrypt")

class UserService extends BaseServise {
  getTokenFromUserModel() {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env

    const token = jwt.sign({ id: this._id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    })

    return token
  }

  joiValidation(user) {
    const schema = Joi.object({
      username: Joi.min(2),
      email: Joi.email(),
      password: Joi.min(6),
    })

    schema.string().required().trim()

    return schema.validate(user)
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

    const checkedPassword = await bcrypt.compare(password, user.password)

    if (!user || !checkedPassword)
      throw createError(400, "Girilen email/şifre hatalıdır!")

    return user
  }

  async getMyProfile() {}
}

module.exports = new UserService(User)

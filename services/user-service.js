const BaseService = require("./base-service")
const User = require("../models/User")
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

  generateAccessToken(user) {
    const { JWT_ACCESS_SECRET_KEY, JWT_EXPIRE } = process.env

    const accessToken = jwt.sign({ user }, JWT_ACCESS_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    })

    return accessToken
  }

  generateRefleshToken(user) {
    const { JWT_REFLESH_SECRET_KEY } = process.env

    const accessToken = jwt.sign({ user }, JWT_REFLESH_SECRET_KEY)

    return accessToken
  }
}

module.exports = new UserService(User)

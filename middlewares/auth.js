const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").split(" ")[1]

    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(id)

    if (!user) throw new Error("Lütfen giriş yapınız")
    else req.user = user

    next()
  } catch (error) {
    next(new Error("Lütfen giriş yapınız"))
  }
}

module.exports = authMiddleware

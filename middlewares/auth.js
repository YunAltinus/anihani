const jwt = require("jsonwebtoken")
const { userService } = require("../services")

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").split(" ")[1]

    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await userService.findById(id)

    if (!user) throw new Error("Lütfen giriş yapınız")

    req.user = user

    next()
  } catch (error) {
    next(new Error("Lütfen giriş yapınız"))
  }
}

module.exports = authMiddleware

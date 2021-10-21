const router = require("express").Router()
const authMiddleware = require("../middlewares/auth")

const {
  getMyProfile,
  register,
  login,
  updateMyProfile,
} = require("../controllers/user")

router.get("/profile/:userId", authMiddleware, getMyProfile)

router.post("/", register)

router.post("/login", login)

router.patch("/profile", authMiddleware, updateMyProfile)

module.exports = router

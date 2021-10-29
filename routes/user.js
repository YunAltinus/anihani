const router = require("express").Router()

const { registerValidation, loginValidation } = require("../validations/user") // validations
const validate = require("../middlewares/validation")

const authMiddleware = require("../middlewares/auth")

const {
  getUserProfile,
  register,
  login,
  updateMyProfile,
} = require("../controllers/user")

router.get("/profile/:userId", getUserProfile)

router.post("/register", validate(registerValidation), register)

router.post("/login", validate(loginValidation), login)

router.patch(
  "/profile",
  [authMiddleware, validate(loginValidation)],
  updateMyProfile
)

module.exports = router

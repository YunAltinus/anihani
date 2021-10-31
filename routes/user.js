const router = require("express").Router()

const { registerValidation, loginValidation } = require("../validations/user") // validations
const validate = require("../middlewares/validation")

const authMiddleware = require("../middlewares/auth")

const {
  getUserProfile,
  register,
  login,
  updateMyProfile,
  getAllUser,
} = require("../controllers/user")

router.get("/users", getAllUser)

router.patch(
  "/profile/:userId",
  [authMiddleware, validate(loginValidation)],
  updateMyProfile
)

router.get("/profile/:userId", getUserProfile)

router.post("/register", validate(registerValidation), register)

router.post("/login", validate(loginValidation), login)

module.exports = router

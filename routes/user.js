const router = require("express").Router()
const createError = require("http-errors")
const { userService } = require("../services")

const authMiddleware = require("../middlewares/auth")

const {
  getMyProfile,
  register,
  updateMyProfile,
} = require("../controllers/user")

router.get("/profile/:userId", async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.userId)

    return res.status(200).json({ user })
  } catch (error) {
    next(createError(400, "kullanici bulunamadi"))
  }
})

router.post("/", async (req, res, next) => {
  try {
    await userService.joiValidation(req.body)
    const hashToUser = await userService.preSaveHashToPassword(req.body)

    const user = await userService.insert(hashToUser)

    const token = await userService.getTokenFromUserService(user._id)

    return res.status(200).json({ user, token })
  } catch (err) {
    next(createError(400, err))
  }
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await userService.login(email, password)

    const token = userService.getTokenFromUserService(user._id)

    // const toJsonUser = userService.toJSON(user)
    // console.log("toJsonUser", toJsonUser)

    return res.json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.patch("/profile", authMiddleware, async (req, res, next) => {
  const { id } = req.user

  try {
    await userService.joiValidation(req.body)

    const hashToUser = await userService.preSaveHashToPassword(req.body)

    const updatedUser = await userService.update(id, hashToUser, {
      new: true,
      runValidators: true,
    })
    console.log("updated", updatedUser)

    if (!updatedUser) next(createError(404, "Kullanıcı bulunamadı!"))

    return res.json({
      message: "Kullanıcı güncellendi!",
      updatedUser,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

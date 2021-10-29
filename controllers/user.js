const createError = require("http-errors")
const { userService } = require("../services")

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params?.userId)

    if (!user) res.status(404).json({ message: "Kullanici bulunamadi" })

    return res.status(200).json({ user })
  } catch (error) {
    next(createError(400, "kullanici bulunamadi"))
  }
}

const register = async (req, res, next) => {
  try {
    const hashToUser = await userService.preSaveHashToPassword(req.body)

    const user = await userService.insert(hashToUser)
    if (!user) res.status(500).json({ message: "Kullanici olusturulamadi" })

    const accessToken = userService.generateAccessToken(user)
    const refleshToken = userService.generateRefleshToken(user)

    const newUser = {
      ...user?.toObject(),
      token: {
        accessToken,
        refleshToken,
      },
    }

    delete newUser.password

    return res.json(newUser)
  } catch (err) {
    next(createError(400, err))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await userService.login(email, password)

    const accessToken = userService.generateAccessToken(user)
    const refleshToken = userService.generateRefleshToken(user)

    const newUser = {
      ...user.toObject(),
      token: {
        accessToken,
        refleshToken,
      },
    }

    delete newUser.password

    return res.json(newUser)
  } catch (err) {
    next(err)
  }
}

const updateMyProfile = async (req, res, next) => {
  const { id } = req.user

  try {
    await userService.joiValidation(req.body)

    const hashToUser = await userService.preSaveHashToPassword(req.body)

    const updatedUser = await userService.update(id, hashToUser, {
      new: true,
      runValidators: true,
    })

    if (!updatedUser) next(createError(404, "Kullanıcı güncellenemedi!"))

    return res.json({
      message: "Kullanıcı güncellendi!",
      updatedUser,
    })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  getUserProfile,
  register,
  updateMyProfile,
  login,
}

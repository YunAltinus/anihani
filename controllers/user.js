const createError = require("http-errors")
const { userService } = require("../services")

const getAllUser = async (req, res, next) => {
  try {
    const lastUsers = await userService.load()

    if (!lastUsers) res.status(404).json({ message: "Kullanicilar bulunamadi" })

    const users = [...lastUsers]

    return res.status(200).json({ users })
  } catch (error) {
    next(createError(400, "kullanici bulunamadi"))
  }
}

const getUserProfile = async (req, res, next) => {
  try {
    const lastUser = await userService.findById(req.params?.userId)

    if (!lastUser) res.status(404).json({ message: "Kullanici bulunamadi" })

    const user = {
      ...lastUser.toObject(),
    }

    delete user["password"]

    return res.status(200).json({ user })
  } catch (error) {
    next(createError(400, "kullanici bulunamadi"))
  }
}

const register = async (req, res, next) => {
  try {
    const hashToUser = await userService.preSaveHashToPassword(req.body)

    const lastUser = await userService.insert(hashToUser)
    if (!lastUser) res.status(500).json({ message: "Kullanici olusturulamadi" })

    const accessToken = userService.generateAccessToken(lastUser)
    const refleshToken = userService.generateRefleshToken(lastUser)

    const user = {
      ...lastUser?.toObject(),
      token: {
        accessToken,
        refleshToken,
      },
    }

    delete user.password

    return res.json(user)
  } catch (err) {
    next(createError(400, err))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const lastUser = await userService.login(email, password)

    const accessToken = userService.generateAccessToken(lastUser)
    const refleshToken = userService.generateRefleshToken(lastUser)

    const user = {
      ...lastUser.toObject(),
      token: {
        accessToken,
        refleshToken,
      },
    }

    delete user.password

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

const updateMyProfile = async (req, res, next) => {
  const { _id } = req.user
  let updateUser = req.body

  try {
    if (updateUser?.password)
      updateUser = await userService.preSaveHashToPassword(updateUser)

    const user = await userService.update(_id, updateUser)
    if (!user) next(createError(400, "Kullanici guncellenemedi"))

    return res.json({
      message: "Kullanıcı güncellendi!",
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
  getAllUser,
}

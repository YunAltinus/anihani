const createError = require("http-errors")
const { userServise } = require("../services")

const getMyProfile = async (req, res, next) => {
  try {
    const user = await userServise.findById(req.id)

    res.json({ message: "OK", user })
  } catch (err) {
    res.status(404).json({ message: "Kullanıcı bulunamadı" })
  }
}

const register = async ({ body }, res, next) => {
  try {
    const newUser = await new User(body)
    // Methods kullanabilmek için user modelinin oluşması gerek!
    const { error } = newUser.joiValidation()

    if (error) {
      next(createError(400, error))
    } else {
      const token = await newUser.getTokenFromUserModel()

      const user = await newUser.save()

      return res.status(200).json({ user, token })
    }
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)

    const token = await user.getTokenFromUserModel()

    return res.json({ user, token })
  } catch (err) {
    next(err)
  }
}

const updateMyProfile = async (req, res, next) => {
  delete req.body.createdAt
  delete req.body.updatedAt

  const { id } = req.user
  const { error } = await User.joiValidationForUpdate(req.body)

  if (error) {
    next(createError(400, error))
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })

      if (updatedUser) {
        return res.json({
          message: "Kullanıcı güncellendi!",
          updatedUser,
        })
      } else {
        throw createError(404, "Kullanıcı bulunamadı!")
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = {
  getMyProfile,
  register,
  login,
  updateMyProfile,
}

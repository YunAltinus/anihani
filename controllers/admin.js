const createError = require("http-errors")
const User = require("../models/User")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})

    if (users) {
      return res.json(users)
    } else {
      return res.status(404).json({
        message: "kullanicilar getirilemedi",
      })
    }
  } catch (err) {
    return res.json({ message: "bulunamadi" })
  }
}

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    return res.json(user)
  } catch (err) {
    next(createError(404, "Kullanıcı bulunamadı"))
  }
}

const updateUser = async (req, res, next) => {
  delete req.body.createdAt
  delete req.body.updatedAt

  const { id } = req.params
  const { error } = await User.joiValidationForUpdate(req.body)

  if (error) next(createError(400, error))

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedUser) throw createError(404, "Kullanıcı bulunamadı!")

    return res.json({
      message: "Kullanıcı güncellendi!",
      updatedUser,
    })
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  const result = await User.findByIdAndDelete(id)

  if (!result) throw createError(400, "Kullanıcı silme işlemi başarısız!")

  res.status(200).json({ message: "Kullanıcı silindi!" })
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}

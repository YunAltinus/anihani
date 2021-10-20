const BaseServise = require("./base-service")
const Admin = require("../models/Admin")
const UserServise = require("./user-service")

class AdminService extends BaseServise {
  async getAllUsers() {
    try {
      const users = await UserServise.findBy()

      users.pre("find", function (next) {
        console.log("find")
      })

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
}

module.exports = new AdminService(Admin)

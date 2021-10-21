const router = require("express").Router()
const user = require("./user")
const admin = require("./admin")

router.use("/users", user)
// router.use("/admin", admin);

module.exports = router

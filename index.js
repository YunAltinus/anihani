const express = require("express")
const app = express()
const config = require("./config")
const loaders = require("./loaders")
const { user } = require("./routes")
const errorHandler = require("./middlewares/errorHandler")
const helmet = require("helmet")

config()
loaders()

require("./loaders/mongo-connect")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use("/", user)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("Server ayaga kaldirildi")
})

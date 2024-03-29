const express = require("express")
const app = express()
const config = require("./config")
const loaders = require("./loaders")
const { user, anime } = require("./routes")
const errorHandler = require("./middlewares/errorHandler")
const helmet = require("helmet")

config()
loaders()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use("/api", user)
app.use("/api/anime", anime)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("Server ayaga kaldirildi")
})

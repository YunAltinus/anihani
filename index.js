const express = require("express")
const app = express()
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

require("dotenv").config()

require("./db/connectDb")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("Server ayaga kaldirildi")
})

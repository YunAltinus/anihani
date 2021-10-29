const mongoose = require("mongoose")

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Db'ye baglanildi")
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  connectDatabase,
}

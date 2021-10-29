const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },

    password: String,

    email: {
      type: String,
      unique: true,
    },

    birth: String,

    isAdmin: Boolean,
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("User", UserSchema)

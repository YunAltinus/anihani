const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

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
    isAdmin: Boolean,
    birth: String,
  },
  { timestamps: true }
)

// Password hashing before saving to database
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err)

      this.password = hash

      next()
    })
  })
})

module.exports = mongoose.model("User", UserSchema)

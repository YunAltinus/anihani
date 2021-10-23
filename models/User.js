const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    isAdmin: Boolean,
    birth: String,
  },
  { timestamps: true }
)

// Password hashing before saving to database
// UserSchema.pre("save", function (next) {
//   if (!this.isModified("password")) next()

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) next(err)

//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) next(err)

//       this.password = hash

//       next()
//     })
//   })
// })

module.exports = mongoose.model("User", UserSchema)

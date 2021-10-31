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

    favorites: {
      animes: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Anime",
          autopopulate: { maxDepth: 1 },
        },
      ],
    },

    birth: String,

    isAdmin: Boolean,
  },
  { timestamps: true, versionKey: false }
)

UserSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("User", UserSchema)

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },

    alternativeTitle: {
      type: String,
      unique: true,
    },

    synopsis: String,

    startDate: String,

    endDate: String,

    startSeason: {
      type: String,
      enum: ["winter", "spring", "summer", "fall"],
    },

    score: Number,

    popularity: Number,

    genres: String,

    averageEpisodeDuration: String,

    studio: String,
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("User", UserSchema)

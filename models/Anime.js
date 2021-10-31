const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AnimeSchema = new Schema(
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

    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        autopopulate: { maxDepth: 1 },
      },
    ],

    score: Number,

    popularity: Number,

    genres: String,

    averageEpisodeDuration: String,

    studio: String,
  },
  { timestamps: true, versionKey: false }
)

AnimeSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("Anime", AnimeSchema)

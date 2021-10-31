const router = require("express").Router()
const validate = require("../middlewares/validation")
const { createValidation } = require("../validations/anime")
const authMiddleware = require("../middlewares/auth")
const {
  getAnime,
  getAnimeList,
  createAnime,
  addFavAnime,
} = require("../controllers/anime")

router
  .route("/")
  .get(getAnimeList)
  .post([authMiddleware, validate(createValidation)], createAnime)

router.route("/:animeId").get(getAnime).post(authMiddleware, addFavAnime)

module.exports = router

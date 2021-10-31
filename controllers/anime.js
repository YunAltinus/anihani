const createError = require("http-errors")
const { animeService } = require("../services")

const getAnimeList = async (req, res, next) => {
  try {
    const animes = await animeService.load()

    return res.json({ animes })
  } catch (error) {}
}

const getAnime = async (req, res, next) => {
  const { animeId } = req.params
  try {
    const anime = await animeService.findById(animeId)
    if (!anime) return res.status(404).json({ message: "anime bulunamadi" })

    return res.json({ anime })
  } catch (error) {
    next(createError(400, "Anime bulunamadi"))
  }
}

const createAnime = async (req, res, next) => {
  try {
    const anime = await animeService.insert(req.body)

    res.json({ anime })
  } catch (error) {
    next(createError(400, error))
  }
}

const addFavAnime = async (req, res, next) => {
  await animeService.addFavAnime(req.user._id, req.params.animeId)

  return res.json(req.user)
}

module.exports = {
  getAnimeList,
  createAnime,
  addFavAnime,
  getAnime,
}

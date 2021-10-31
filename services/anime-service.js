const BaseService = require("./base-service")
const userService = require("./user-service")
const Anime = require("../models/Anime")

class AnimeService extends BaseService {
  async addFavAnime(userId, animeId) {
    const user = await userService.findById(userId)

    const anime = await this.findById(animeId)

    user.favorites.animes.push(anime)
    anime.favorites.push(user)

    await user.save()
    await anime.save()
    return anime
  }
}

module.exports = new AnimeService(Anime)

const Joi = require("joi")

const createValidation = Joi.object({
  title: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{2,60}$"))
    .required()
    .trim(),

  alternativeTitle: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{2,30}$"))
    .required()
    .trim(),

  synopsis: Joi.string(),

  startDate: Joi.string().trim(),

  endDate: Joi.string().trim(),

  startSeason: Joi.string().trim(),

  score: Joi.number(),

  popularity: Joi.number(),

  genres: Joi.string().trim(),

  averageEpisodeDuration: Joi.string().trim(),

  studio: Joi.string().trim(),
})

const editValidation = Joi.object({
  token: Joi.string(),

  username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,30}$")).trim(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).trim(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .trim(),
})

module.exports = {
  createValidation,
  editValidation,
}

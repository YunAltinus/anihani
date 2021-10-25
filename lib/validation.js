const Joi = require("joi")

const schema = Joi.object({
  username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,30}$")).trim(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).trim(),

  repeatPassword: Joi.ref("password"),

  token: [Joi.string(), Joi.number()],

  birth: Joi.string().trim(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  isAdmin: Joi.boolean().default(false),
})
  .xor("password", "token")
  .xor("password", "repeatPassword")

module.exports = schema

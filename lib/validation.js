const Joi = require("joi")

const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).trim(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).trim(),

  repeatPassword: Joi.ref("password"),

  // accessToken: [Joi.string(), Joi.number()],

  birth: Joi.string().trim(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  isAdmin: Joi.boolean().default(false),
})
  // .with("username", "birth")
  // .xor("password", "accessToken")
  .with("password", "repeatPassword")

module.exports = schema

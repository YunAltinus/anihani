const Joi = require("joi")

const registerValidation = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{2,30}$"))
    .required()
    .trim(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .trim(),

  repeatPassword: Joi.ref("password"),

  birth: Joi.string().trim(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  isAdmin: Joi.boolean().default(false),
}).with("password", "repeatPassword")

const loginValidation = Joi.object({
  username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,30}$")).trim(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).trim(),

  birth: Joi.string().trim(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
})

module.exports = {
  registerValidation,
  loginValidation,
}

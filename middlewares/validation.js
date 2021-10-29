const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = validate

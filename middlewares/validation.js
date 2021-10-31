const validate = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = validate

const adminMiddleware = async (req, res, next) => {
  if (!req.user?.isAdmin)
    res.status(403).json({
      success: false,
      message: "Bu alan için yetkiye sahip değilsiniz!",
    })

  next()
}

module.exports = adminMiddleware

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).json({
      status: false,
      message: `Bu ${Object.keys(err.keyValue)}  kullanılmaktadır!`,
    });
  }

  return res.status(err.status || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;

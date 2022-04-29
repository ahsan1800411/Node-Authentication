exports.errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode ? err.statusCode : 500,
    message: err.message || 'Internal Server error',
  };
  if (err.name === 'ValidationError') {
    (defaultError.statusCode = 400),
      (defaultError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(', '));
  }
  if (err.code === 11000) {
    (defaultError.statusCode = 400),
      (defaultError.message = 'Email must be unique');
  }

  res.status(defaultError.statusCode).json({
    success: false,
    statusCode: defaultError.statusCode,
    message: defaultError.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '',
    // error: err,
  });
};

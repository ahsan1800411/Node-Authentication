const { StatusCodes } = require('http-status-codes');
const ErrorHandler = require('../utils/errorHandler');
const JWT = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader && !authHeader.startsWith('Bearer'))
    throw new ErrorHandler('Not authorized', StatusCodes.UNAUTHORIZED);

  const token = authHeader.split(' ')[1];

  if (!token)
    throw new ErrorHandler('Not authorized', StatusCodes.UNAUTHORIZED);

  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

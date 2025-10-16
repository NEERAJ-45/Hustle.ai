const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Access denied. No token provided');
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      const error = new Error('Invalid token');
      error.statusCode = 401;
      return next(error);
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error('User no longer exists');
      error.statusCode = 401;
      return next(error);
    }

    // Add user to request object
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;

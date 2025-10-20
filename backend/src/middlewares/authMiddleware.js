const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }
    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      const error = new Error('Invalid token');
      error.statusCode = 401;
      return next(error);
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }

    // Attach userId, role, email for downstream checks
    req.user = { userId: user._id.toString(), role: user.role, email: user.email };
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = authMiddleware;

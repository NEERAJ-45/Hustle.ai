const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validate = require('../middlewares/validation');
const authMiddleware = require('../middlewares/authMiddleware');

// Rate limiting for auth routes
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 30* 1000, // 15 minutes
  max: 15, // 5 requests per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

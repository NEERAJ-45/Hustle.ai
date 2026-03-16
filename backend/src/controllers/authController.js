// src/controllers/authController.js
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res
      .status(200)
      .json({ success: true, message: "Login successful", data: result });
  } catch (error) {
    next(error);
  }
};

const oauthExchange = async (req, res, next) => {
  try {
    const result = await authService.oauthExchangeUser(req.body);
    res
      .status(200)
      .json({
        success: true,
        message: "OAuth exchange successful",
        data: result,
      });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.userId);
    res
      .status(200)
      .json({
        success: true,
        message: "Profile retrieved successfully",
        data: { user },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  oauthExchange,
  getProfile,
};

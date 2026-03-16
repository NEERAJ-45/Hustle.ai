// src/controllers/userController.js
const userService = require("../services/userService");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.userId);
    res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(
      req.user.userId,
      req.body,
      req.user.email,
    );
    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id, req.user.email);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

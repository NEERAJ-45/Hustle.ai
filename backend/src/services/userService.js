// src/services/userService.js
const User = require("../models/user.model");
const logger = require("../utils/logger");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const updateProfile = async (userId, updates, email) => {
  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-passwordHash");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[Profile Update] User ${user.email} updated profile`);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-passwordHash");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const deleteUser = async (id, adminEmail) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[User Deleted] Admin ${adminEmail} deleted user ${user.email}`);
};

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
  deleteUser,
};

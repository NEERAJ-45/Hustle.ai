const User = require("../models/user.model");

// GET /api/v1/users/me
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/users/me
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const logger = require("../utils/logger");
    logger.log(`[Profile Update] User ${user.email} updated profile`);
    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/users/:id (admin)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/users/:id (admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    logger.log(
      `[User Deleted] Admin ${req.user.email} deleted user ${user.email}`,
    );
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

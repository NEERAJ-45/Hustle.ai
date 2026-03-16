// src/controllers/uploadController.js
const uploadService = require("../services/uploadService");

exports.uploadFile = async (req, res, next) => {
  try {
    const data = uploadService.processUpload(
      req.file,
      req.user.userId,
      req.user.email,
    );
    res.json({ success: true, message: "File uploaded successfully", data });
  } catch (err) {
    next(err);
  }
};

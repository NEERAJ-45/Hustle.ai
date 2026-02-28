const path = require("path");

// Handles uploading various files and associates them with user or resume if needed
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        user: req.user.userId,
      },
    });
    const logger = require("../utils/logger");
    logger.log(
      `[File UPLOADED] User ${req.user.email}: ${req.file.originalname}`,
    );
  } catch (err) {
    next(err);
  }
};

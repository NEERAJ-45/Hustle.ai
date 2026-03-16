// src/services/uploadService.js
const logger = require("../utils/logger");

const processUpload = (file, userId, email) => {
  if (!file) {
    const error = new Error("No file uploaded");
    error.statusCode = 400;
    throw error;
  }
  logger.log(`[File UPLOADED] User ${email}: ${file.originalname}`);
  return {
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
    user: userId,
  };
};

module.exports = { processUpload };

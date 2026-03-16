// src/services/resumeService.js
const Resume = require("../models/resume.model");
const fs = require("fs");
const logger = require("../utils/logger");

const listResumes = async (userId, { page = 1, limit = 10 }) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Number(limit) || 10, 50);
  const skip = (page - 1) * limit;

  const [resumes, total] = await Promise.all([
    Resume.find({ userId })
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Resume.countDocuments({ userId }),
  ]);

  return {
    data: resumes,
    meta: { total, page, totalPages: Math.ceil(total / limit) },
  };
};

const createResume = async (userId, file, { title }, email) => {
  if (!file) {
    const error = new Error("No resume file provided");
    error.statusCode = 400;
    throw error;
  }
  const { originalname, filename, path: filePath, mimetype, size } = file;
  const resume = new Resume({
    userId,
    title,
    fileInfo: {
      filename,
      originalName: originalname,
      filePath,
      fileSize: size,
      mimeType: mimetype,
    },
  });
  await resume.save();
  logger.log(`[Resume Uploaded] User ${email} - File ${filename}`);
  return {
    id: resume._id,
    title,
    originalName: originalname,
    mimeType: mimetype,
    fileSize: size,
    createdAt: resume.createdAt,
  };
};

const getResume = async (id) => {
  const resume = await Resume.findById(id).select("-__v");
  if (!resume) {
    const error = new Error("Resume not found");
    error.statusCode = 404;
    throw error;
  }
  return resume;
};

const updateResume = async (id, userId, body, file, email) => {
  const updates = { ...body, updatedAt: new Date() };
  if (file) {
    updates.fileInfo = {
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }
  const resume = await Resume.findOneAndUpdate({ _id: id, userId }, updates, {
    new: true,
    runValidators: true,
  }).select("-__v");
  if (!resume) {
    const error = new Error("Resume not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(
    `[Resume Updated] User ${email} - Resume ${resume.fileInfo.filename}`,
  );
  return resume;
};

const deleteResume = async (id, userId, email) => {
  const resume = await Resume.findOneAndDelete({ _id: id, userId });
  if (!resume) {
    const error = new Error("Resume not found");
    error.statusCode = 404;
    throw error;
  }
  if (resume.fileInfo?.filePath && fs.existsSync(resume.fileInfo.filePath)) {
    fs.unlinkSync(resume.fileInfo.filePath);
  }
  logger.log(
    `[Resume Deleted] User ${email} - Resume ${resume.fileInfo.filename}`,
  );
};

module.exports = {
  listResumes,
  createResume,
  getResume,
  updateResume,
  deleteResume,
};

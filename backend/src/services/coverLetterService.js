// src/services/coverLetterService.js
const CoverLetter = require("../models/cover_letter.model");
const logger = require("../utils/logger");

const listCoverLetters = async (userId, { page = 1, limit = 10 }) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Number(limit) || 10, 50);
  const skip = (page - 1) * limit;

  const [letters, total] = await Promise.all([
    CoverLetter.find({ userId })
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    CoverLetter.countDocuments({ userId }),
  ]);

  return {
    data: letters,
    meta: { total, page, totalPages: Math.ceil(total / limit) },
  };
};

const createCoverLetter = async (
  userId,
  { jobId, content, aiGeneration, template },
  email,
) => {
  const letter = new CoverLetter({
    userId,
    jobId,
    content,
    aiGeneration,
    template,
  });
  await letter.save();
  logger.log(`[Cover Letter Created] User ${email} - Letter for job ${jobId}`);
  return { id: letter._id, ...letter.toObject() };
};

const getCoverLetter = async (id) => {
  const letter = await CoverLetter.findById(id).select("-__v");
  if (!letter) {
    const error = new Error("Cover letter not found");
    error.statusCode = 404;
    throw error;
  }
  return letter;
};

const updateCoverLetter = async (id, userId, updates, email) => {
  updates.updatedAt = new Date();
  const letter = await CoverLetter.findOneAndUpdate(
    { _id: id, userId },
    updates,
    { new: true, runValidators: true },
  ).select("-__v");
  if (!letter) {
    const error = new Error("Cover letter not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[Cover Letter Updated] User ${email} - Letter ${letter._id}`);
  return letter;
};

const deleteCoverLetter = async (id, userId, email) => {
  const letter = await CoverLetter.findOneAndDelete({ _id: id, userId });
  if (!letter) {
    const error = new Error("Cover letter not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[Cover Letter Deleted] User ${email} - Letter ${letter._id}`);
};

module.exports = {
  listCoverLetters,
  createCoverLetter,
  getCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
};

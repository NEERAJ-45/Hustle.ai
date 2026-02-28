const CoverLetter = require("../models/cover_letter.model");

// List all cover letters for authenticated user
exports.listCoverLetters = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const [letters, total] = await Promise.all([
      CoverLetter.find({ userId: req.user.userId })
        .select("-__v")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      CoverLetter.countDocuments({ userId: req.user.userId }),
    ]);
    res.json({
      success: true,
      message: "Cover letters listed",
      data: letters,
      meta: { total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

exports.createCoverLetter = async (req, res, next) => {
  try {
    const { jobId, content, aiGeneration, template } = req.body;
    const letter = new CoverLetter({
      userId: req.user.userId,
      jobId,
      content,
      aiGeneration,
      template,
    });
    await letter.save();
    const logger = require("../utils/logger");
    logger.log(
      `[Cover Letter Created] User ${req.user.email} - Letter for job ${jobId}`,
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Cover letter created",
        data: { id: letter._id, ...letter.toObject() },
      });
  } catch (err) {
    next(err);
  }
};

exports.getCoverLetter = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findById(req.params.id).select("-__v");
    if (!letter)
      return res
        .status(404)
        .json({ success: false, message: "Cover letter not found" });
    res.json({ success: true, message: "Letter details", data: letter });
  } catch (err) {
    next(err);
  }
};

exports.updateCoverLetter = async (req, res, next) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    const letter = await CoverLetter.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updates,
      { new: true, runValidators: true },
    ).select("-__v");
    if (!letter)
      return res
        .status(404)
        .json({ success: false, message: "Cover letter not found" });
    logger.log(
      `[Cover Letter Updated] User ${req.user.email} - Letter ${letter._id}`,
    );
    res.json({ success: true, message: "Letter updated", data: letter });
  } catch (err) {
    next(err);
  }
};

exports.deleteCoverLetter = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!letter)
      return res
        .status(404)
        .json({ success: false, message: "Cover letter not found" });
    logger.log(
      `[Cover Letter Deleted] User ${req.user.email} - Letter ${letter._id}`,
    );
    res.json({ success: true, message: "Letter deleted" });
  } catch (err) {
    next(err);
  }
};

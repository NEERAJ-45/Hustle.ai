const JobMatch = require("../models/job_match.model");
const Job = require("../models/job.model");
const User = require("../models/user.model");

// List AI job matches for current user (with filters and pagination)
exports.listJobMatches = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, minScore, maxScore, status } = req.query;
    const filters = { userId: req.user.userId, isActive: true };
    if (minScore) filters.score = { ...filters.score, $gte: Number(minScore) };
    if (maxScore) filters.score = { ...filters.score, $lte: Number(maxScore) };
    if (status) filters.status = status;

    const matches = await JobMatch.find(filters)
      .populate({
        path: "jobId",
        select: "title company location postedDate jobType",
      })
      .sort({ score: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await JobMatch.countDocuments(filters);

    res.json({
      success: true,
      message: "Job matches fetched",
      data: matches,
      meta: { total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// Simulate AI job matching refresh for current user
exports.refreshJobMatches = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Archive old matches
    await JobMatch.updateMany(
      { userId: user._id, isActive: true },
      { $set: { isActive: false, archivedAt: new Date() } },
    );

    // Simulate matching: fetch jobs and create JobMatch docs
    const jobs = await Job.find({ isActive: true }).limit(20); // Limit for sample AI
    const newMatches = [];
    for (const job of jobs) {
      // Basic score simulation (you would use real AI/model here)
      const score = Math.floor(Math.random() * 100) + 1;
      newMatches.push({
        userId: user._id,
        jobId: job._id,
        score,
        status: "new",
        isActive: true,
        createdAt: new Date(),
      });
    }
    const created = await JobMatch.insertMany(newMatches);

    const summary = {
      total: created.length,
      minScore: Math.min(...created.map((j) => j.score)),
      maxScore: Math.max(...created.map((j) => j.score)),
      averageScore: Math.round(
        created.reduce((s, j) => s + j.score, 0) / created.length,
      ),
    };
    res.json({
      success: true,
      message: "Job matches refreshed",
      data: { summary, matches: created.slice(0, 5) },
    });
    const logger = require("../utils/logger");
    logger.log(
      `[JobMatch REFRESHED] User ${user.email}: ${created.length} matches`,
    );
  } catch (err) {
    next(err);
  }
};

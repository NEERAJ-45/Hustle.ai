// src/services/jobMatchService.js
const JobMatch = require("../models/job_match.model");
const Job = require("../models/job.model");
const User = require("../models/user.model");
const logger = require("../utils/logger");

const listJobMatches = async (
  userId,
  { page = 1, limit = 10, minScore, maxScore, status },
) => {
  const filters = { userId, isActive: true };
  if (minScore) filters.matchScore = { ...filters.matchScore, $gte: Number(minScore) };
  if (maxScore) filters.matchScore = { ...filters.matchScore, $lte: Number(maxScore) };
  if (status) filters.status = status;

  const matches = await JobMatch.find(filters)
    .populate({
      path: "jobId",
      select: "title company location postedDate jobType",
    })
    .sort({ matchScore: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await JobMatch.countDocuments(filters);

  return {
    data: matches,
    meta: { total, page, totalPages: Math.ceil(total / limit) },
  };
};

const refreshJobMatches = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await JobMatch.updateMany(
    { userId: user._id, isActive: true },
    { $set: { isActive: false, archivedAt: new Date() } },
  );

  const jobs = await Job.find({ isActive: true }).limit(20);
  const newMatches = [];
  for (const job of jobs) {
    const score = Math.floor(Math.random() * 100) + 1;
    newMatches.push({
      userId: user._id,
      jobId: job._id,
      matchScore: score,
      status: "new",
      isActive: true,
      createdAt: new Date(),
    });
  }
  const created = await JobMatch.insertMany(newMatches);

  const summary = {
    total: created.length,
    minScore: Math.min(...created.map((j) => j.matchScore)),
    maxScore: Math.max(...created.map((j) => j.matchScore)),
    averageScore: Math.round(
      created.reduce((s, j) => s + j.matchScore, 0) / created.length,
    ),
  };

  logger.log(
    `[JobMatch REFRESHED] User ${user.email}: ${created.length} matches`,
  );

  return { summary, matches: created.slice(0, 5) };
};

module.exports = {
  listJobMatches,
  refreshJobMatches,
};

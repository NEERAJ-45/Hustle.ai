// src/services/searchService.js
const User = require("../models/user.model");
const Job = require("../models/job.model");
const logger = require("../utils/logger");

const globalSearch = async (
  { q, type = "job", page = 1, limit = 10 },
  email,
) => {
  if (!q) {
    const error = new Error("Search query required");
    error.statusCode = 400;
    throw error;
  }

  const filter = { $text: { $search: q } };
  let Model, select;

  if (type === "job") {
    Model = Job;
    select = "title company location jobType postedDate";
  } else if (type === "user") {
    Model = User;
    select = "name email profile.skills";
  } else {
    const error = new Error("Invalid search type");
    error.statusCode = 400;
    throw error;
  }

  const results = await Model.find(filter)
    .select(select)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  logger.log(`[Search] User ${email} searched "${q}" on ${type}`);
  return results;
};

module.exports = { globalSearch };

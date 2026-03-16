// src/controllers/jobMatchController.js
const jobMatchService = require("../services/jobMatchService");

exports.listJobMatches = async (req, res, next) => {
  try {
    const result = await jobMatchService.listJobMatches(
      req.user.userId,
      req.query,
    );
    res.json({ success: true, message: "Job matches fetched", ...result });
  } catch (err) {
    next(err);
  }
};

exports.refreshJobMatches = async (req, res, next) => {
  try {
    const data = await jobMatchService.refreshJobMatches(req.user.userId);
    res.json({ success: true, message: "Job matches refreshed", data });
  } catch (err) {
    next(err);
  }
};

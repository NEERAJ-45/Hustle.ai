// src/controllers/jobController.js
const jobService = require("../services/jobService");

exports.listJobs = async (req, res, next) => {
  try {
    const result = await jobService.listJobs(req.query);
    res.json({ success: true, message: "Job listed successfully", ...result });
  } catch (err) {
    next(err);
  }
};

exports.getJobMapData = async (req, res, next) => {
  try {
    const result = await jobService.getJobMapData(req.query);
    res.json({
      success: true,
      message: "Job map data fetched successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const data = await jobService.getJobById(req.params.id);
    res.json({
      success: true,
      message: "Job details fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const data = await jobService.createJob(req.body, req.user.email);
    res
      .status(201)
      .json({ success: true, message: "Job created successfully", data });
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const data = await jobService.updateJob(
      req.params.id,
      req.body,
      req.user.email,
    );
    res.json({ success: true, message: "Job updated successfully", data });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id, req.user.email);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

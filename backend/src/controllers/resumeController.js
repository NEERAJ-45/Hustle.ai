// src/controllers/resumeController.js
const resumeService = require("../services/resumeService");
const { tailorResume } = require("../services/resumeTailoringService");

exports.listResumes = async (req, res, next) => {
  try {
    const result = await resumeService.listResumes(req.user.userId, req.query);
    res.json({ success: true, message: "Resumes listed", ...result });
  } catch (err) {
    next(err);
  }
};

exports.createResume = async (req, res, next) => {
  try {
    const data = await resumeService.createResume(
      req.user.userId,
      req.file,
      req.body,
      req.user.email,
    );
    res.status(201).json({ success: true, message: "Resume uploaded", data });
  } catch (err) {
    next(err);
  }
};

exports.getResume = async (req, res, next) => {
  try {
    const data = await resumeService.getResume(req.params.id);
    res.json({ success: true, message: "Resume details", data });
  } catch (err) {
    next(err);
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const data = await resumeService.updateResume(
      req.params.id,
      req.user.userId,
      req.body,
      req.file,
      req.user.email,
    );
    res.json({ success: true, message: "Resume updated", data });
  } catch (err) {
    next(err);
  }
};

exports.tailorResume = async (req, res, next) => {
  try {
    const data = await tailorResume(req.user.userId, req.body.jobId);
    res.status(201).json({ success: true, message: "Tailored resume generated", data });
  } catch (err) {
    next(err);
  }
};

exports.deleteResume = async (req, res, next) => {
  try {
    await resumeService.deleteResume(
      req.params.id,
      req.user.userId,
      req.user.email,
    );
    res.json({ success: true, message: "Resume deleted" });
  } catch (err) {
    next(err);
  }
};

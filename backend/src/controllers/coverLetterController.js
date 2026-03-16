// src/controllers/coverLetterController.js
const coverLetterService = require("../services/coverLetterService");

exports.listCoverLetters = async (req, res, next) => {
  try {
    const result = await coverLetterService.listCoverLetters(
      req.user.userId,
      req.query,
    );
    res.json({ success: true, message: "Cover letters listed", ...result });
  } catch (err) {
    next(err);
  }
};

exports.createCoverLetter = async (req, res, next) => {
  try {
    const data = await coverLetterService.createCoverLetter(
      req.user.userId,
      req.body,
      req.user.email,
    );
    res
      .status(201)
      .json({ success: true, message: "Cover letter created", data });
  } catch (err) {
    next(err);
  }
};

exports.getCoverLetter = async (req, res, next) => {
  try {
    const data = await coverLetterService.getCoverLetter(req.params.id);
    res.json({ success: true, message: "Letter details", data });
  } catch (err) {
    next(err);
  }
};

exports.updateCoverLetter = async (req, res, next) => {
  try {
    const data = await coverLetterService.updateCoverLetter(
      req.params.id,
      req.user.userId,
      req.body,
      req.user.email,
    );
    res.json({ success: true, message: "Letter updated", data });
  } catch (err) {
    next(err);
  }
};

exports.deleteCoverLetter = async (req, res, next) => {
  try {
    await coverLetterService.deleteCoverLetter(
      req.params.id,
      req.user.userId,
      req.user.email,
    );
    res.json({ success: true, message: "Letter deleted" });
  } catch (err) {
    next(err);
  }
};

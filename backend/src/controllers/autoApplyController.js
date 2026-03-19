// src/controllers/autoApplyController.js
const { enqueueAutoApplyJob } = require("../services/autoApplyService");

exports.autoApply = async (req, res, next) => {
  try {
    const result = await enqueueAutoApplyJob(req.user.userId, req.body);
    res.status(202).json({
      success: true,
      message: "Job enqueued for auto-apply",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

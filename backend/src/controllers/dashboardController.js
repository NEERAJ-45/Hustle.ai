// src/controllers/dashboardController.js
const dashboardService = require("../services/dashboardService");

exports.getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardData(req.user.userId);
    res.json({ success: true, message: "Dashboard loaded", data });
  } catch (err) {
    next(err);
  }
};

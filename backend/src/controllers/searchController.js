// src/controllers/searchController.js
const searchService = require("../services/searchService");

exports.globalSearch = async (req, res, next) => {
  try {
    const data = await searchService.globalSearch(req.query, req.user.email);
    res.json({ success: true, message: "Search complete", data });
  } catch (err) {
    next(err);
  }
};

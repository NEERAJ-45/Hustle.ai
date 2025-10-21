const User = require('../models/user.model');
const Job = require('../models/job.model');

// Global job/user search
exports.globalSearch = async (req, res, next) => {
  try {
    const { q, type = 'job', page = 1, limit = 10 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Search query required" });
    let filter = { $text: { $search: q } };
    let Model, select;
    if (type === 'job') {
      Model = Job;
      select = 'title company location jobType postedDate';
    } else if (type === 'user') {
      Model = User;
      select = 'name email profile.skills';
    } else {
      return res.status(400).json({ success: false, message: "Invalid search type" });
    }
    const results = await Model.find(filter).select(select)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, message: "Search complete", data: results });
    console.log(`[Search] User ${req.user.email} searched "${q}" on ${type}`);
  } catch (err) { next(err); }
};

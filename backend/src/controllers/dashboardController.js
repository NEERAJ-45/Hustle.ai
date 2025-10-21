const Application = require('../models/application.model');
const JobMatch = require('../models/job_match.model');
const User = require('../models/user.model');

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Applications counts by status
    const appAgg = await Application.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const totalApp = appAgg.reduce((s, row) => s + row.count, 0);
    const applications = { total: totalApp };
    ['submitted', 'interview', 'offers'].forEach(key => {
      const found = appAgg.find(a => a._id === key);
      applications[key] = found ? found.count : 0;
    });

    // JobMatch stats
    const matchAgg = await JobMatch.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const matchTotal = matchAgg.reduce((s, row) => s + row.count, 0);
    const matches = { total: matchTotal };
    ['applied', 'saved'].forEach(key => {
      const found = matchAgg.find(a => a._id === key);
      matches[key] = found ? found.count : 0;
    });

    // Upcoming interviews (next 5)
    const interviews = await Application.find({ userId, status: 'interview', interviewDate: { $gte: new Date() } })
      .sort({ interviewDate: 1 }).limit(5)
      .populate({ path: 'jobId', select: 'title company' });

    // Profile score calculation example
    const user = await User.findById(userId);
    const profile = {
      completionScore: user && user.profile ? Math.min(100, Math.round(30 + (user.profile.skills?.length || 0) * 10)) : 0
    };

    res.json({
      success: true,
      message: "Dashboard loaded",
      data: { applications, matches, interviews, profile }
    });
  } catch (err) { next(err); }
};

const mongoose = require("mongoose");
const Application = require("../models/Application.model");
const JobMatch = require("../models/job_match.model");
const User = require("../models/user.model");

const toObjectId = (value) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
};

const normalizeStatus = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const buildJobLocation = (job) => {
  if (!job?.location) return "Remote";

  if (job.location.isRemote) return "Remote";

  const parts = [
    job.location.city,
    job.location.state,
    job.location.country,
  ].filter(Boolean);
  return parts.join(", ") || "Remote";
};

const buildSalaryLabel = (job) => {
  if (!job?.salary) return "Salary not specified";

  const { min, max, currency = "USD", period = "Yearly" } = job.salary;
  if (typeof min !== "number" && typeof max !== "number") {
    return "Salary not specified";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  if (typeof min === "number" && typeof max === "number") {
    return `${formatter.format(min)} - ${formatter.format(max)} / ${period}`;
  }

  if (typeof min === "number") {
    return `${formatter.format(min)}+ / ${period}`;
  }

  return `Up to ${formatter.format(max)} / ${period}`;
};

exports.getDashboard = async (req, res, next) => {
  try {
    console.log(
      `[Dashboard] Authenticated request for userId=${req.user?.userId}`,
    );
    const userId = toObjectId(req.user.userId);

    const [appAgg, matchAgg, user, rawUpcomingInterviews, rawMatches, rawApps] =
      await Promise.all([
        Application.aggregate([
          { $match: { userId } },
          { $group: { _id: "$status.current", count: { $sum: 1 } } },
        ]),
        JobMatch.aggregate([
          { $match: { userId } },
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ]),
        User.findById(userId).lean(),
        Application.find({
          userId,
          interviews: {
            $elemMatch: {
              scheduledAt: { $gte: new Date() },
              status: "Scheduled",
            },
          },
        })
          .sort({ "interviews.scheduledAt": 1 })
          .limit(5)
          .populate({
            path: "jobId",
            select: "title company location salary",
          })
          .lean(),
        JobMatch.find({ userId, isActive: true })
          .sort({ matchScore: -1, createdAt: -1 })
          .limit(5)
          .populate({
            path: "jobId",
            select: "title company location salary postedDate",
          })
          .lean(),
        Application.find({ userId })
          .sort({ appliedAt: -1, createdAt: -1 })
          .limit(5)
          .populate({ path: "jobId", select: "title company" })
          .lean(),
      ]);

    const appCounts = {
      total: 0,
      submitted: 0,
      interviews: 0,
      offers: 0,
    };

    for (const row of appAgg) {
      appCounts.total += row.count;
      const status = normalizeStatus(row._id);

      if (
        [
          "submitted",
          "application submitted",
          "under review",
          "shortlisted",
        ].includes(status)
      ) {
        appCounts.submitted += row.count;
      }

      if (status.includes("interview")) {
        appCounts.interviews += row.count;
      }

      if (status.includes("offer")) {
        appCounts.offers += row.count;
      }
    }

    const matchCounts = {
      total: 0,
      applied: 0,
      saved: 0,
    };

    for (const row of matchAgg) {
      matchCounts.total += row.count;
      const status = normalizeStatus(row._id);
      if (status === "applied") {
        matchCounts.applied += row.count;
      }
      if (status === "saved") {
        matchCounts.saved += row.count;
      }
    }

    const upcomingInterviews = rawUpcomingInterviews
      .map((application) => {
        const nextInterview = [...(application.interviews || [])]
          .filter(
            (entry) =>
              entry?.status === "Scheduled" &&
              entry?.scheduledAt &&
              new Date(entry.scheduledAt) >= new Date(),
          )
          .sort(
            (a, b) =>
              new Date(a.scheduledAt).getTime() -
              new Date(b.scheduledAt).getTime(),
          )[0];

        if (!nextInterview) return null;

        return {
          id: String(application._id),
          title: application.jobId?.title || "Interview",
          company:
            application.jobId?.company?.name ||
            application.jobId?.company ||
            "Unknown Company",
          scheduledAt: nextInterview.scheduledAt,
          type: nextInterview.type || "Interview",
          status: nextInterview.status,
          location:
            nextInterview.location ||
            application.jobId?.location?.city ||
            "TBD",
        };
      })
      .filter(Boolean);

    const jobMatchesList = rawMatches.map((matchDoc) => ({
      id: String(matchDoc._id),
      title: matchDoc.jobId?.title || "Untitled role",
      company: matchDoc.jobId?.company?.name || "Unknown Company",
      location: buildJobLocation(matchDoc.jobId),
      salary: buildSalaryLabel(matchDoc.jobId),
      match: matchDoc.matchScore,
      posted: matchDoc.jobId?.postedDate || matchDoc.createdAt,
      status: normalizeStatus(matchDoc.status),
    }));

    const applicationsList = rawApps.map((app) => {
      const title = app.jobId?.title || "Unknown Role";
      const company = app.jobId?.company?.name || "Unknown Company";
      const stage = app.status?.current || "Submitted";

      return {
        id: String(app._id),
        job: `${title} at ${company}`,
        status: stage,
        date: (app.appliedAt || app.createdAt || new Date())
          .toISOString()
          .slice(0, 10),
        stage,
      };
    });

    const profile = {
      completionScore:
        user && user.profile
          ? Math.min(
              100,
              Math.round(30 + (user.profile.skills?.length || 0) * 10),
            )
          : 0,
    };

    res.json({
      success: true,
      message: "Dashboard loaded",
      data: {
        stats: {
          jobMatches: matchCounts.total,
          applicationsSent: appCounts.total,
          interviews: appCounts.interviews,
          offers: appCounts.offers,
        },
        applications: appCounts,
        matches: matchCounts,
        interviews: upcomingInterviews,
        profile,
        jobMatchesList,
        applicationsList,
      },
    });
  } catch (err) {
    next(err);
  }
};

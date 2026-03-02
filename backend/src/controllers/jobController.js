const Job = require("../models/job.model");

const getExperienceRangeFallback = (job) => {
  const levelToRange = {
    Entry: "0 - 2 Years",
    Mid: "2 - 5 Years",
    Senior: "5 - 8 Years",
    Lead: "8 - 12 Years",
    Executive: "12+ Years",
  };

  return levelToRange[job.experienceLevel] || "3 - 8 Years";
};

const getDefaultSpecifications = (job) => {
  const skillLines = (job.requiredSkills || [])
    .map((skill) => {
      if (!skill?.name) return null;
      const years = Number.isFinite(skill.minYearsExperience)
        ? ` (${skill.minYearsExperience}+ years)`
        : "";
      return `Strong proficiency in ${skill.name}${years}.`;
    })
    .filter(Boolean);

  return [
    ...skillLines,
    "Excellent problem-solving and debugging skills.",
    "Experience building scalable backend services and APIs.",
    "Ability to write clean, testable, and maintainable code.",
    "Strong communication and collaboration in cross-functional teams.",
    "Comfortable working in a fast-paced product environment.",
  ];
};

const getDefaultResponsibilities = (job) => {
  const skillNames = (job.requiredSkills || [])
    .map((skill) => skill?.name)
    .filter(Boolean);

  const topSkills = skillNames.slice(0, 4).join(", ");
  const arrangement = job.location?.workArrangement || "Hybrid";

  return [
    `Design, build, and maintain production-grade systems for ${job.title || "the role"}.`,
    "Collaborate with product, design, and engineering teams to translate business requirements into scalable technical solutions.",
    "Write clean, reusable, and well-tested code with strong focus on performance, reliability, and security.",
    "Review pull requests, enforce coding standards, and mentor junior developers through technical guidance and feedback.",
    "Own debugging, root-cause analysis, and incident resolution for critical production issues.",
    "Participate in architecture discussions and contribute to continuous improvement of engineering best practices.",
    `Work effectively in a ${arrangement.toLowerCase()} setup while maintaining strong communication and delivery discipline.`,
    topSkills
      ? `Preferred hands-on exposure includes: ${topSkills}.`
      : "Preferred hands-on exposure includes backend APIs, data modeling, and modern web application development.",
  ];
};

const getDefaultAboutCompany = (job) => {
  const companyName = job.company?.name || "The company";
  const normalized = companyName.toLowerCase();

  if (normalized.includes("pixel labs")) {
    return "Pixel Labs is a product-first technology company that builds data-driven digital platforms for businesses worldwide. We focus on engineering excellence, rapid experimentation, and high-quality user experiences while solving complex real-world problems.";
  }

  const industry = job.company?.industry || "technology";
  return `${companyName} is a growing ${industry} company building reliable, scalable products for global users. Our teams value ownership, continuous learning, and measurable impact.`;
};

const buildDetailedJD = (job) => {
  const existing = job.detailedJD || {};
  const locationParts = [
    job.location?.city,
    job.location?.state,
    job.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const fallbackExperienceDetails = [
    `Hands-on experience level expected: ${getExperienceRangeFallback(job)}.`,
    "Proven ownership of features from design to deployment.",
    "Experience mentoring junior developers and reviewing pull requests.",
    "Ability to identify performance bottlenecks and improve system reliability.",
  ];

  return {
    companyName: job.company?.name || "",
    companyLogo: job.company?.logo || "",
    companyWebsite: existing.website || job.company?.website || "",
    backToOpeningsLabel: existing.backToOpeningsLabel || "Back to all openings",
    title: job.title || "",
    subtitle: `${locationParts || "Location not specified"} | ${existing.department || "Engineering"} | ${job.jobType || "Full-time"}`,
    roleTitle: existing.roleTitle || job.title || "",
    experienceRange:
      existing.experienceRange || getExperienceRangeFallback(job),
    experienceDetails:
      Array.isArray(existing.experienceDetails) &&
      existing.experienceDetails.length
        ? existing.experienceDetails
        : fallbackExperienceDetails,
    locationText: existing.locationText || locationParts || "",
    responsibilities:
      Array.isArray(existing.responsibilities) &&
      existing.responsibilities.length
        ? existing.responsibilities
        : getDefaultResponsibilities(job),
    specifications:
      Array.isArray(existing.specifications) && existing.specifications.length
        ? existing.specifications
        : getDefaultSpecifications(job),
    aboutCompany: existing.aboutCompany || getDefaultAboutCompany(job),
    aboutHighlights:
      Array.isArray(existing.aboutHighlights) && existing.aboutHighlights.length
        ? existing.aboutHighlights
        : [
            "Fast-paced product culture with strong ownership.",
            "Collaborative engineering environment with continuous learning.",
            "Opportunity to solve high-impact problems at scale.",
          ],
    shareText: existing.shareText || "Share this opening with friends",
    poweredBy: existing.poweredBy || "Trakstar Hire",
  };
};

// Utility: parses query params for pagination, search, filtering
const getQueryOptions = (req) => {
  let {
    page = 1,
    limit = 10,
    search,
    location,
    jobType,
    experienceLevel,
    company,
    isRemote,
  } = req.query;

  // Convert query params to usable values
  page = Number(page);
  limit = Math.min(Number(limit), 100);

  // Build MongoDB filter object for queries
  const filter = {};
  if (search) filter.$text = { $search: search };
  if (location) filter["location.city"] = location;
  if (jobType) filter.jobType = jobType;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (company) filter["company.name"] = company;
  if (isRemote) filter["location.isRemote"] = isRemote === "true";

  return { page, limit, filter };
};

// List jobs with pagination, search/filter functionality
exports.listJobs = async (req, res, next) => {
  try {
    const { page, limit, filter } = getQueryOptions(req);
    const skip = (page - 1) * limit;
    // Find jobs using filter and pagination
    const jobs = await Job.find(filter)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Job.countDocuments(filter);
    res.json({
      success: true,
      message: "Job listed successfully",
      data: jobs,
      meta: {
        total, // total jobs found
        page, // current page
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get job details by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    const jobObject = job.toObject();
    jobObject.detailedJD = buildDetailedJD(jobObject);

    res.json({
      success: true,
      message: "Job details fetched successfully",
      data: jobObject,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new job (admin/recruiter only)
exports.createJob = async (req, res, next) => {
  try {
    // Use request body contents for new job
    const job = new Job(req.body);
    await job.save();
    const logger = require("../utils/logger");
    logger.log(`[Job Created] User ${req.user.email} created job ${job.title}`);
    res
      .status(201)
      .json({ success: true, message: "Job created successfully", data: job });
  } catch (err) {
    next(err);
  }
};

// Update an existing job by ID (admin/recruiter only)
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    logger.log(`[Job Updated] User ${req.user.email} updated job ${job.title}`);
    res.json({ success: true, message: "Job updated successfully", data: job });
  } catch (err) {
    next(err);
  }
};

// Delete a job by ID (admin/recruiter only)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    logger.log(`[Job Deleted] User ${req.user.email} deleted job ${job.title}`);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

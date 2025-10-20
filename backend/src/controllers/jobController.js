const Job = require('../models/job.model');

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
    isRemote
  } = req.query;

  // Convert query params to usable values
  page = Number(page);
  limit = Math.min(Number(limit), 100);

  // Build MongoDB filter object for queries
  const filter = {};
  if (search) filter.$text = { $search: search };
  if (location) filter['location.city'] = location;
  if (jobType) filter.jobType = jobType;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (company) filter['company.name'] = company;
  if (isRemote) filter['location.isRemote'] = isRemote === 'true';

  return { page, limit, filter };
};

// List jobs with pagination, search/filter functionality
exports.listJobs = async (req, res, next) => {
  try {
    const { page, limit, filter } = getQueryOptions(req);
    const skip = (page - 1) * limit;
    // Find jobs using filter and pagination
    const jobs = await Job.find(filter).sort({ postedDate: -1 }).skip(skip).limit(limit);
    const total = await Job.countDocuments(filter);
    res.json({
      success: true,
      message: "Job listed successfully",
      data: jobs,
      meta: {
        total,           // total jobs found
        page,            // current page
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get job details by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job details fetched successfully", data: job });
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
    console.log(`[Job Created] User ${req.user.email} created job ${job.title}`);
    res.status(201).json({ success: true, message: "Job created successfully", data: job });
  } catch (err) {
    next(err);
  }
};

// Update an existing job by ID (admin/recruiter only)
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    console.log(`[Job Updated] User ${req.user.email} updated job ${job.title}`);
    res.json({ success: true, message: "Job updated successfully", data: job });
  } catch (err) {
    next(err);
  }
};

// Delete a job by ID (admin/recruiter only)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    console.log(`[Job Deleted] User ${req.user.email} deleted job ${job.title}`);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

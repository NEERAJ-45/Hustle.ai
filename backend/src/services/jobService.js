// src/services/jobService.js
// Handles business logic for jobs

const Job = require("../models/job.model");
const logger = require("../utils/logger");

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const LOCATION_SYNONYMS = {
  bengaluru: ["bengaluru", "bangalore", "bengalooru"],
  bangalore: ["bengaluru", "bangalore", "bengalooru"],
  bengalooru: ["bengaluru", "bangalore", "bengalooru"],
};

const getLocationVariants = (value = "") => {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return [];
  return LOCATION_SYNONYMS[normalized] || [normalized];
};

const buildLocationClauseFromText = (value = "") => {
  const variants = getLocationVariants(value);
  const regexes = variants.map(
    (variant) => new RegExp(escapeRegex(variant), "i"),
  );
  if (!regexes.length) return null;
  return {
    $or: regexes.flatMap((locationRegex) => [
      { "location.city": locationRegex },
      { "location.state": locationRegex },
      { "location.country": locationRegex },
    ]),
  };
};

const toNumberIfFinite = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const normalizeCoordinates = (coordinates) => {
  if (!coordinates) return null;
  const latitude = toNumberIfFinite(coordinates.latitude);
  const longitude = toNumberIfFinite(coordinates.longitude);
  if (latitude === null || longitude === null) return null;
  return { latitude, longitude };
};

const buildLocationDetails = (job) => {
  const city = job?.location?.city || "";
  const state = job?.location?.state || "";
  const country = job?.location?.country || "";
  const coordinates = normalizeCoordinates(job?.location?.coordinates);
  const isRemote = Boolean(job?.location?.isRemote);
  const workArrangement =
    job?.location?.workArrangement || (isRemote ? "Remote" : "On-site");
  const placeParts = [city, state, country].filter(Boolean);
  return {
    city,
    state,
    country,
    label: placeParts.join(", ") || "Location not specified",
    coordinates,
    isRemote,
    workArrangement,
  };
};

const enrichJobForClient = (job) => {
  const plain = typeof job?.toObject === "function" ? job.toObject() : job;
  return {
    ...plain,
    locationDetails: buildLocationDetails(plain),
  };
};

const buildJobApplicationUrl = ({
  id,
  title,
  applicationMethod,
  externalApplicationUrl,
  applicationEmail,
}) => {
  if (applicationMethod === "External" && externalApplicationUrl) {
    return externalApplicationUrl;
  }
  if (applicationMethod === "Email" && applicationEmail) {
    const subject = encodeURIComponent(
      `Application for ${title || "the role"}`,
    );
    return `mailto:${applicationEmail}?subject=${subject}`;
  }
  return `/dashboard/jobs?jobId=${id}`;
};

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

const getQueryOptions = (query) => {
  let {
    page = 1,
    limit = 10,
    search,
    location,
    jobType,
    experienceLevel,
    company,
    isRemote,
  } = query;
  page = Number(page);
  limit = Math.min(Number(limit), 100);
  const andClauses = [];
  if (search) {
    const safeSearch = escapeRegex(String(search).trim());
    if (safeSearch) {
      const searchRegex = new RegExp(safeSearch, "i");
      const locationSearchClause = buildLocationClauseFromText(search);
      andClauses.push({
        $or: [
          { title: searchRegex },
          { "company.name": searchRegex },
          { description: searchRegex },
          { "requiredSkills.name": searchRegex },
          { "location.city": searchRegex },
          { "location.state": searchRegex },
          { "location.country": searchRegex },
          ...(locationSearchClause?.$or || []),
        ],
      });
    }
  }
  if (location) {
    const locationText = String(location).trim();
    const locationTokens = locationText
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean)
      .slice(0, 3);
    if (locationTokens.length > 1) {
      andClauses.push({
        $and: locationTokens.map(
          (token) => buildLocationClauseFromText(token) || { $or: [] },
        ),
      });
    } else {
      const locationClause = buildLocationClauseFromText(locationText);
      if (locationClause) {
        andClauses.push(locationClause);
      }
    }
  }
  const filter = andClauses.length ? { $and: andClauses } : {};
  if (jobType) filter.jobType = jobType;
  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (company) filter["company.name"] = company;
  if (isRemote) filter["location.isRemote"] = isRemote === "true";
  return {
    page,
    limit,
    filter,
    search: typeof search === "string" ? search.trim() : "",
    location: typeof location === "string" ? location.trim() : "",
    isRemote: isRemote === "true",
  };
};

// ── CRUD Business Logic ──

const listJobs = async (query) => {
  const { page, limit, filter, search, location, isRemote } =
    getQueryOptions(query);
  const skip = (page - 1) * limit;

  const [jobs, total, remoteCount, locations, jobTypes] = await Promise.all([
    Job.find(filter).sort({ postedDate: -1 }).skip(skip).limit(limit),
    Job.countDocuments(filter),
    Job.countDocuments({ ...filter, "location.isRemote": true }),
    Job.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            city: "$location.city",
            state: "$location.state",
            country: "$location.country",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Job.aggregate([
      { $match: filter },
      { $group: { _id: "$jobType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  const topLocations = locations
    .map((item) => {
      const parts = [
        item?._id?.city,
        item?._id?.state,
        item?._id?.country,
      ].filter(Boolean);
      return {
        name: parts.join(", ") || "Location not specified",
        count: item?.count || 0,
      };
    })
    .filter((item) => item.count > 0);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const enrichedJobs = jobs.map((job) => enrichJobForClient(job));

  return {
    data: enrichedJobs,
    meta: {
      total,
      page,
      totalPages,
      metadata: {
        generatedAt: new Date().toISOString(),
        appliedFilters: { search, location, isRemote },
        stats: {
          remoteCount,
          nonRemoteCount: Math.max(total - remoteCount, 0),
        },
        topLocations,
        jobTypeDistribution: jobTypes
          .map((item) => ({
            type: item?._id || "Unknown",
            count: item?.count || 0,
          }))
          .filter((item) => item.count > 0),
        locationCoverage: {
          withCoordinates: enrichedJobs.filter((j) =>
            Boolean(j?.locationDetails?.coordinates),
          ).length,
          withoutCoordinates: enrichedJobs.filter(
            (j) => !j?.locationDetails?.coordinates,
          ).length,
        },
      },
    },
  };
};

const getJobMapData = async (query) => {
  const { filter, search, location, isRemote } = getQueryOptions(query);

  const markers = await Job.aggregate([
    { $match: filter },
    {
      $project: {
        _id: 1,
        title: 1,
        companyName: "$company.name",
        city: "$location.city",
        state: "$location.state",
        country: "$location.country",
        coordinates: "$location.coordinates",
        isRemote: "$location.isRemote",
        workArrangement: "$location.workArrangement",
        jobType: 1,
        postedDate: 1,
        applicationMethod: 1,
        externalApplicationUrl: 1,
        applicationEmail: 1,
      },
    },
    {
      $group: {
        _id: {
          latitude: "$coordinates.latitude",
          longitude: "$coordinates.longitude",
          city: "$city",
          state: "$state",
          country: "$country",
        },
        jobs: {
          $push: {
            id: "$_id",
            title: "$title",
            companyName: "$companyName",
            jobType: "$jobType",
            isRemote: "$isRemote",
            workArrangement: "$workArrangement",
            postedDate: "$postedDate",
            applicationMethod: "$applicationMethod",
            externalApplicationUrl: "$externalApplicationUrl",
            applicationEmail: "$applicationEmail",
          },
        },
        totalJobs: { $sum: 1 },
      },
    },
    { $sort: { totalJobs: -1 } },
    { $limit: 300 },
  ]);

  const normalizedMarkers = markers
    .map((marker) => {
      const coordinates = normalizeCoordinates({
        latitude: marker?._id?.latitude,
        longitude: marker?._id?.longitude,
      });
      if (!coordinates) return null;
      const locationParts = [
        marker?._id?.city,
        marker?._id?.state,
        marker?._id?.country,
      ].filter(Boolean);
      return {
        location: {
          city: marker?._id?.city || "",
          state: marker?._id?.state || "",
          country: marker?._id?.country || "",
          label: locationParts.join(", ") || "Location not specified",
          coordinates,
        },
        totalJobs: marker?.totalJobs || 0,
        jobs: (marker?.jobs || []).slice(0, 10).map((jobItem) => {
          const id = String(jobItem?.id || "");
          return {
            id,
            title: jobItem?.title || "",
            companyName: jobItem?.companyName || "",
            jobType: jobItem?.jobType || "",
            isRemote: Boolean(jobItem?.isRemote),
            workArrangement: jobItem?.workArrangement || "",
            postedDate: jobItem?.postedDate || null,
            applicationUrl: buildJobApplicationUrl({
              id,
              title: jobItem?.title,
              applicationMethod: jobItem?.applicationMethod,
              externalApplicationUrl: jobItem?.externalApplicationUrl,
              applicationEmail: jobItem?.applicationEmail,
            }),
          };
        }),
      };
    })
    .filter(Boolean);

  const totalJobs = normalizedMarkers.reduce(
    (sum, m) => sum + (m?.totalJobs || 0),
    0,
  );

  const bounds = normalizedMarkers.reduce(
    (acc, marker) => {
      const lat = marker.location.coordinates.latitude;
      const lng = marker.location.coordinates.longitude;
      return {
        minLatitude: Math.min(acc.minLatitude, lat),
        maxLatitude: Math.max(acc.maxLatitude, lat),
        minLongitude: Math.min(acc.minLongitude, lng),
        maxLongitude: Math.max(acc.maxLongitude, lng),
      };
    },
    {
      minLatitude: 90,
      maxLatitude: -90,
      minLongitude: 180,
      maxLongitude: -180,
    },
  );

  const hasBounds = normalizedMarkers.length > 0;

  return {
    data: normalizedMarkers,
    meta: {
      generatedAt: new Date().toISOString(),
      totalMarkers: normalizedMarkers.length,
      totalJobs,
      appliedFilters: { search, location, isRemote },
      bounds: hasBounds
        ? bounds
        : {
            minLatitude: null,
            maxLatitude: null,
            minLongitude: null,
            maxLongitude: null,
          },
    },
  };
};

const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }
  const jobObject = job.toObject();
  jobObject.locationDetails = buildLocationDetails(jobObject);
  jobObject.detailedJD = buildDetailedJD(jobObject);
  return jobObject;
};

const createJob = async (body, email) => {
  const job = new Job(body);
  await job.save();
  logger.log(`[Job Created] User ${email} created job ${job.title}`);
  return job;
};

const updateJob = async (id, body, email) => {
  const job = await Job.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[Job Updated] User ${email} updated job ${job.title}`);
  return job;
};

const deleteJob = async (id, email) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }
  logger.log(`[Job Deleted] User ${email} deleted job ${job.title}`);
};

module.exports = {
  getQueryOptions,
  enrichJobForClient,
  buildJobApplicationUrl,
  buildLocationDetails,
  buildDetailedJD,
  listJobs,
  getJobMapData,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};

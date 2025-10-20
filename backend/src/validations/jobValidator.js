const Joi = require("joi");

// Schema for validating job creation requests
exports.createJobSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  company: Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().optional(),
    website: Joi.string().uri().optional(),
    size: Joi.string()
      .valid("Startup", "Small", "Medium", "Large", "Enterprise")
      .optional(),
    industry: Joi.string().optional(),
  }).required(),
  description: Joi.string().max(10000).required(),
  requirements: Joi.string().max(5000).optional(),
  location: Joi.object({
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().required(),
    coordinates: Joi.object({
      latitude: Joi.number().optional(),
      longitude: Joi.number().optional(),
    }).optional(),
    isRemote: Joi.boolean().optional(),
    workArrangement: Joi.string()
      .valid("Remote", "Hybrid", "On-site")
      .required(),
  }).required(),
  jobType: Joi.string()
    .valid("Full-Time", "Part-Time", "Contract", "Freelance", "Internship")
    .required(),
  experienceLevel: Joi.string()
    .valid("Entry", "Mid", "Senior", "Lead", "Executive")
    .required(),
  requiredSkills: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        importance: Joi.string()
          .valid("Required", "Preferred", "Nice-to-have")
          .optional(),
        minYearsExperience: Joi.number().min(0).optional(),
      })
    )
    .optional(),
  salary: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
    currency: Joi.string().optional(),
    period: Joi.string().valid("Hourly", "Monthly", "Yearly").optional(),
  }).optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
  applicationMethod: Joi.string()
    .valid("Platform", "External", "Email")
    .optional(),
  externalApplicationUrl: Joi.string().uri().optional(),
  applicationEmail: Joi.string().email().optional(),
  postedDate: Joi.date().optional(),
  applicationDeadline: Joi.date().optional(),
  source: Joi.object({
    platform: Joi.string().required(),
    originalUrl: Joi.string().uri().optional(),
    scrapedAt: Joi.date().optional(),
  }).required(),
  isActive: Joi.boolean().optional(),
  isVerified: Joi.boolean().optional(),
  applicationCount: Joi.number().optional(),
  viewCount: Joi.number().optional(),
});

// Same schema as create, but all fields optional for update
exports.updateJobSchema = exports.createJobSchema.fork(
  Object.keys(exports.createJobSchema.describe().keys),
  (field) => field.optional()
);

// Schema for validating :id route param
exports.idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

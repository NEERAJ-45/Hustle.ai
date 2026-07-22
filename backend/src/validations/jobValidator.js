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
  detailedJD: Joi.object({
    roleTitle: Joi.string().max(200).optional(),
    experienceRange: Joi.string().max(100).optional(),
    experienceDetails: Joi.array().items(Joi.string().max(500)).optional(),
    locationText: Joi.string().max(200).optional(),
    department: Joi.string().max(120).optional(),
    responsibilities: Joi.array().items(Joi.string().max(500)).optional(),
    specifications: Joi.array().items(Joi.string().max(500)).optional(),
    aboutCompany: Joi.string().max(4000).optional(),
    aboutHighlights: Joi.array().items(Joi.string().max(500)).optional(),
    website: Joi.string().uri().optional(),
    backToOpeningsLabel: Joi.string().max(120).optional(),
    shareText: Joi.string().max(200).optional(),
    poweredBy: Joi.string().max(120).optional(),
  }).optional(),
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
      }),
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

// Same schema as create, but all fields optional for update (including nested required fields)
const makeOptionalRecursive = (schema) => {
  const desc = schema.describe();
  if (desc.type !== 'object') return schema.optional();
  const keys = Object.keys(desc.keys || {});
  let result = schema;
  for (const key of keys) {
    if (desc.keys[key].type === 'object') {
      result = result.fork([key], (field) => makeOptionalRecursive(field));
    }
  }
  return result.fork(keys, (field) => field.optional());
};

exports.updateJobSchema = makeOptionalRecursive(exports.createJobSchema);

// Schema for validating :id route param
exports.idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

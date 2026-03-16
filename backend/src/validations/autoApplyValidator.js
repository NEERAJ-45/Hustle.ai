const Joi = require("joi");

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .message("{{#label}} must be a valid 24-character ObjectId");

// Schema for validating auto-apply job requests
exports.autoApplyJobSchema = Joi.object({
  candidateId: objectId.required(),
  jobId: objectId.required(),
  resumeUrl: Joi.string().uri().required(),
  coverLetter: Joi.string().max(5000).optional(),
  platform: Joi.string()
    .valid("linkedin", "indeed", "company_site")
    .optional(),
  notes: Joi.string().max(1000).optional(),
});

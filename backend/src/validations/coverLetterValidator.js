const Joi = require('joi');
exports.createCoverLetterSchema = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
  content: Joi.string().max(5000).required(),
  aiGeneration: Joi.object().optional(),
  template: Joi.object().optional()
});
exports.updateCoverLetterSchema = Joi.object({
  content: Joi.string().max(5000),
  aiGeneration: Joi.object().optional(),
  template: Joi.object().optional()
});
exports.idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

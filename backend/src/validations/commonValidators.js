const Joi = require('joi');

exports.jobMatchQuerySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  minScore: Joi.number().min(0).optional(),
  maxScore: Joi.number().max(100).optional(),
  status: Joi.string().optional()
});

exports.searchQuerySchema = Joi.object({
  q: Joi.string().min(1).required(),
  type: Joi.string().valid('job', 'user').optional(),
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(50).optional()
});

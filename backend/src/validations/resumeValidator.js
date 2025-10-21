const Joi = require('joi');
exports.createResumeSchema = Joi.object({
  title: Joi.string().max(100).required()
});
exports.updateResumeSchema = Joi.object({
  title: Joi.string().max(100)
});
exports.idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

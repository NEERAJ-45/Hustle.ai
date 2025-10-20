const Joi = require("joi");

exports.updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  email: Joi.string().email().lowercase(),
  // Add other fields as needed
});

exports.idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

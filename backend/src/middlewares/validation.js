const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationError = new Error("Validation failed");
      validationError.statusCode = 400;
      validationError.details = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      return next(validationError);
    }

    req.body = value;
    next();
  };
};

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.details.map((d) => ({
          field: d.path.join("."),
          message: d.message,
        })),
      });
    }
    req.body = value;
    next();
  };
};

const validateParam = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameter",
        details: error.details.map((d) => ({
          field: d.path.join("."),
          message: d.message,
        })),
      });
    }
    req.params = value;
    next();
  };
};

// ✅ Export all three functions together
module.exports = {
  validate,
  validateBody,
  validateParam,
};

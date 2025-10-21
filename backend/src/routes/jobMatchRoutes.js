const express = require('express');
const router = express.Router();
const jobMatchController = require('../controllers/jobMatchController');
const requireAuth = require('../middlewares/authMiddleware');
const { validateQuery } = require('../middlewares/validation');
const { jobMatchQuerySchema } = require('../validations/commonValidators');

router.get(
  '/',
  requireAuth,
  validateQuery(jobMatchQuerySchema),
  jobMatchController.listJobMatches
);

router.post(
  '/refresh',
  requireAuth,
  jobMatchController.refreshJobMatches
);

module.exports = router;

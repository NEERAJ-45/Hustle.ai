const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { validateBody, validateParam } = require('../middlewares/validation');
const requireAuth = require('../middlewares/authMiddleware');
const {requireAdminOrRecruiter} = require('../middlewares/roleMiddleware');
const { createJobSchema, updateJobSchema, idParamSchema } = require('../validations/jobValidator');

// @ GET /api/v1/jobs — Get job list (search, filters, pagination, open to all)
router.get('/', jobController.listJobs);

// @ GET /api/v1/jobs/:id — Get job details by ID (open to all)
router.get('/:id', validateParam(idParamSchema), jobController.getJobById);

// @ POST /api/v1/jobs — Create job (admin/recruiter only)
router.post('/', requireAuth, requireAdminOrRecruiter, validateBody(createJobSchema), jobController.createJob);

// @ PUT /api/v1/jobs/:id — Update job by ID (admin/recruiter only)
router.put('/:id', requireAuth, requireAdminOrRecruiter, validateParam(idParamSchema), validateBody(updateJobSchema), jobController.updateJob);

// @ DELETE /api/v1/jobs/:id — Delete job by ID (admin/recruiter only)
router.delete('/:id', requireAuth, requireAdminOrRecruiter, validateParam(idParamSchema), jobController.deleteJob);

module.exports = router;

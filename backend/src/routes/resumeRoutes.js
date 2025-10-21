const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const requireAuth = require("../middlewares/authMiddleware");
const requireOwner = require("../middlewares/ownerMiddleware");
const { validateBody, validateParam } = require("../middlewares/validation");
const { createResumeSchema, updateResumeSchema, idParamSchema } = require("../validations/resumeValidator");
const upload = require("../utils/upload");

// List all resumes for authenticated user
router.get("/", requireAuth, resumeController.listResumes); 

// Upload resume (file + metadata)
router.post(
  "/",
  requireAuth,
  upload.single('resume'), 
  validateBody(createResumeSchema),
  resumeController.createResume
);

// Get resume by ID (owner only)
router.get(
  "/:id",
  requireAuth,
  validateParam(idParamSchema),
  requireOwner("resume"),
  resumeController.getResume
);

// Update resume (owner only)
router.put(
  "/:id",
  requireAuth,
  validateParam(idParamSchema),
  requireOwner("resume"),
  upload.single('resume'),
  validateBody(updateResumeSchema),
  resumeController.updateResume
);

// Delete resume (owner only)
router.delete(
  "/:id",
  requireAuth,
  validateParam(idParamSchema),
  requireOwner("resume"),
  resumeController.deleteResume
);

module.exports = router;

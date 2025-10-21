const express = require("express");
const router = express.Router();
const coverLetterController = require("../controllers/coverLetterController");
const requireAuth = require("../middlewares/authMiddleware");
const requireOwner = require("../middlewares/ownerMiddleware");
const { validateBody, validateParam } = require("../middlewares/validation");
const { createCoverLetterSchema, updateCoverLetterSchema, idParamSchema } = require("../validations/coverLetterValidator");

// List all cover letters for authenticated user
router.get("/", requireAuth, coverLetterController.listCoverLetters);

// Create cover letter
router.post("/", requireAuth, validateBody(createCoverLetterSchema), coverLetterController.createCoverLetter);

// Get cover letter by ID (owner only)
router.get("/:id", requireAuth, validateParam(idParamSchema), requireOwner("coverletter"), coverLetterController.getCoverLetter);

// Update cover letter (owner only)
router.put("/:id", requireAuth, validateParam(idParamSchema), requireOwner("coverletter"), validateBody(updateCoverLetterSchema), coverLetterController.updateCoverLetter);

// Delete cover letter (owner only)
router.delete("/:id", requireAuth, validateParam(idParamSchema), requireOwner("coverletter"), coverLetterController.deleteCoverLetter);

module.exports = router;

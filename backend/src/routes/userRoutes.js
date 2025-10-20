const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const {requireAdmin} = require("../middlewares/roleMiddleware");
const { validateBody, validateParam } = require("../middlewares/validation");
const { updateProfileSchema, idParamSchema } = require("../validations/userValidator");

router.get("/me", auth, userController.getProfile);
router.put("/me", auth, validateBody(updateProfileSchema), userController.updateProfile);

router.get("/:id", auth, requireAdmin, validateParam(idParamSchema), userController.getUserById);
router.delete("/:id", auth, requireAdmin, validateParam(idParamSchema), userController.deleteUser);

module.exports = router;

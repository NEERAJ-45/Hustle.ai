const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const requireAuth = require('../middlewares/authMiddleware');
const { validateQuery } = require('../middlewares/validation');
const { searchQuerySchema } = require('../validators/commonValidators');

router.get('/', requireAuth, validateQuery(searchQuerySchema), searchController.globalSearch);

module.exports = router;

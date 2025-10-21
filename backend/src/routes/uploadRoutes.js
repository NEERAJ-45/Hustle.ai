const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const requireAuth = require('../middlewares/authMiddleware');
const upload = require('../utils/upload'); // Multer config

router.post('/', requireAuth, upload.single('file'), uploadController.uploadFile);

module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = 'uploads/files/';
const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, '_'));
  }
});

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only .pdf, .doc, .docx, .png, .jpg allowed.'), false);
  }
  cb(null, true);
};

const limits = { fileSize: 7 * 1024 * 1024 }; // 7MB

module.exports = multer({ storage, fileFilter, limits });

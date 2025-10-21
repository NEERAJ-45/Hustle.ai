const Resume = require('../models/resume.model');
const fs = require('fs');

// List all resumes for authenticated user (paginated)
exports.listResumes = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const [resumes, total] = await Promise.all([
      Resume.find({ userId: req.user.userId })
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip(skip).limit(limit),
      Resume.countDocuments({ userId: req.user.userId })
    ]);

    res.json({
      success: true,
      message: "Resumes listed",
      data: resumes,
      meta: { total, page, totalPages: Math.ceil(total / limit) }
    });
  } catch (err) { next(err); }
};

// Upload/create resume (file and metadata)
exports.createResume = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No resume file provided" });

    const { originalname, filename, path: filePath, mimetype, size } = req.file;
    const { title } = req.body;

    const resume = new Resume({
      userId: req.user.userId,
      title,
      fileInfo: {
        filename,
        originalName: originalname,
        filePath,
        fileSize: size,
        mimeType: mimetype
      }
    });
    await resume.save();
    console.log(`[Resume Uploaded] User ${req.user.email} - File ${filename}`);
    res.status(201).json({
      success: true,
      message: "Resume uploaded",
      data: {
        id: resume._id,
        title,
        originalName: originalname,
        mimeType: mimetype,
        fileSize: size,
        createdAt: resume.createdAt
      }
    });
  } catch (err) { next(err); }
};

// Get resume by ID (owner only: checked by ownerMiddleware)
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id).select('-__v');
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    res.json({ success: true, message: "Resume details", data: resume });
  } catch (err) { next(err); }
};

// Update resume (metadata or replace file)
exports.updateResume = async (req, res, next) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    if (req.file) {
      updates.fileInfo = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      };
    }
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updates,
      { new: true, runValidators: true }
    ).select('-__v');
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    console.log(`[Resume Updated] User ${req.user.email} - Resume ${resume.fileInfo.filename}`);
    res.json({ success: true, message: "Resume updated", data: resume });
  } catch (err) { next(err); }
};

// Delete resume
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    if (resume.fileInfo && resume.fileInfo.filePath && fs.existsSync(resume.fileInfo.filePath)) {
      fs.unlinkSync(resume.fileInfo.filePath);
    }
    console.log(`[Resume Deleted] User ${req.user.email} - Resume ${resume.fileInfo.filename}`);
    res.json({ success: true, message: "Resume deleted" });
  } catch (err) { next(err); }
};

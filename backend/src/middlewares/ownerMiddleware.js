const Resume = require('../models/resume.model');
const CoverLetter = require('../models/cover_letter.model');

// ownerType: "resume" or "coverletter"
module.exports = (ownerType) => async (req, res, next) => {
  try {
    let ownerIdField = "userId";
    let doc;
    if (ownerType === "resume") {
      doc = await Resume.findById(req.params.id);
    } else if (ownerType === "coverletter") {
      doc = await CoverLetter.findById(req.params.id);
    }
    if (!doc || String(doc[ownerIdField]) !== String(req.user.userId)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

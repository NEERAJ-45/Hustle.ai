const { ROLES } = require('../utils/ENUMS');


const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};


const requireAdminOrRecruiter = (req, res, next) => {
  if (!req.user || ![ROLES.ADMIN, ROLES.RECRUITER].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};


module.exports = { requireAdmin, requireAdminOrRecruiter };

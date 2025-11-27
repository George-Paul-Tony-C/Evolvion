const { ApiError } = require('../utils/ApiHelpers.js');

const verifyAdmin = (req, res, next) => {
  // This middleware should run AFTER verifyJWT, so req.user will be available.
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, "Forbidden: Access is restricted to administrators."));
  }
  next();
};

module.exports = { verifyAdmin };

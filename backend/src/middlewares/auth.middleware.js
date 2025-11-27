// File: backend/src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const { ApiError } = require('../utils/ApiHelpers.js');

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next(new ApiError(401, "Unauthorized request: No token provided"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return next(new ApiError(401, "Invalid Access Token"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error?.message || "Invalid Access Token"));
  }
};

module.exports = { verifyJWT };
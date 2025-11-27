// File: backend/src/controllers/user.controller.js
const { ApiResponse } = require('../utils/ApiHelpers.js');

const getCurrentUser = (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
};

module.exports = { getCurrentUser };
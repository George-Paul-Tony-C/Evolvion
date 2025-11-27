// File: backend/src/controllers/auth.controller.js
const User = require('../models/user.model.js');
const { ApiError, ApiResponse } = require('../utils/ApiHelpers.js');

const registerUser = async (req, res, next) => { /* ... no changes needed ... */ };

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { throw new ApiError(400, "Email and password are required"); }
    const user = await User.findOne({ email });
    if (!user) { throw new ApiError(404, "User does not exist"); }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) { throw new ApiError(401, "Invalid user credentials"); }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      // The 'secure' flag is required for 'sameSite: "none"'
      secure: true, 
      // This explicitly allows the browser to send the cookie on cross-origin requests
      sameSite: "none" 
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser }, "User logged in successfully"));
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
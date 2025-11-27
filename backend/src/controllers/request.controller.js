const User = require('../models/user.model.js');
const { ApiResponse, ApiError } = require('../utils/ApiHelpers.js');

// Controller for an employee to submit a "Sorry Request"
const submitSorryRequest = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user._id; // User is blocked but still logged in to submit

    if (!message) {
      return next(new ApiError(400, "A message is required for the request."));
    }

    const user = await User.findById(userId);

    // Prevent submitting multiple pending requests
    const hasPendingRequest = user.sorryRequests.some(req => req.status === 'pending');
    if (hasPendingRequest) {
      return next(new ApiError(400, "You already have a pending request."));
    }

    user.sorryRequests.push({
      message: message,
      requestDate: new Date(),
      status: 'pending'
    });

    await user.save({ validateBeforeSave: false });

    return res.status(201).json(new ApiResponse(201, user.sorryRequests, "Your request has been submitted."));

  } catch (error) {
    next(error);
  }
};

// Controller for an admin to approve a request
const approveSorryRequest = async (req, res, next) => {
  try {
    const { userIdToUnblock, requestId } = req.body;

    if (!userIdToUnblock || !requestId) {
      return next(new ApiError(400, "User ID and Request ID are required."));
    }

    const user = await User.findById(userIdToUnblock);
    if (!user) {
      return next(new ApiError(404, "User to unblock not found."));
    }

    const request = user.sorryRequests.id(requestId);
    if (!request) {
      return next(new ApiError(404, "Sorry request not found."));
    }

    // Update the user's main status
    user.status = 'active';
    // Update the specific request's status
    request.status = 'approved';

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, { newStatus: user.status }, "User has been unblocked."));

  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitSorryRequest,
  approveSorryRequest
};

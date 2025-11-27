const ProgressTracking = require('../models/progressTracking.model.js');
const { ApiError, ApiResponse } = require('../utils/ApiHelpers.js');

const updateUserProgress = async (req, res, next) => {
  try {
    const { courseId, status } = req.body;
    const userId = req.user._id;

    if (!courseId || !status) {
      return next(new ApiError(400, "Course ID and status are required."));
    }

    // Find the progress document for this user and course, or create it if it doesn't exist.
    const progress = await ProgressTracking.findOneAndUpdate(
      { userId, courseId },
      { 
        userId, 
        courseId, 
        completionStatus: status,
        // If status is 'Completed', set progress to 100, otherwise 50 for 'In Progress'
        currentProgress: status === 'Completed' ? 100 : 50,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true } // `upsert: true` creates the document if it doesn't exist
    );

    return res.status(200).json(
      new ApiResponse(200, progress, "Progress updated successfully")
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserProgress
};

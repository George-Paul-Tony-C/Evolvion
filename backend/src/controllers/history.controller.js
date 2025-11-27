const Assessment = require('../models/assessment.model.js');
const { ApiResponse, ApiError } = require('../utils/ApiHelpers.js');

// Get a list of all past assessments for the logged-in user
const getMyAssessmentHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const history = await Assessment.find({ userId })
      .sort({ completionDate: -1 })
      .select("completionDate proficiencyScores courseId"); // Only select summary fields

    return res.status(200).json(
      new ApiResponse(200, history, "Assessment history fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

// Get the full details of a single past assessment
const getAssessmentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const assessment = await Assessment.findOne({ _id: id, userId });

    if (!assessment) {
      return next(new ApiError(404, "Assessment not found or you do not have permission to view it."));
    }

    return res.status(200).json(
      new ApiResponse(200, assessment, "Assessment details fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyAssessmentHistory,
  getAssessmentDetails
};

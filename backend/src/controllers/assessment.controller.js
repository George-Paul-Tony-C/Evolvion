
const { generateAssessmentFromAI } = require('../services/aiAgentService.js');
const User = require('../models/user.model.js');
const { ApiResponse , ApiError } = require('../utils/ApiHelpers.js');
const { Assessment } = require('../models/assessment.model.js'); // We might not use all

// For Phase 2, we'll hardcode the skill gaps.
// Later, these will come from the Profile Agent.
const MOCK_SKILL_GAPS = ["Advanced Java Concurrency", "Object-Oriented Design Principles"];

const createNewAssessment = async (req, res, next) => {
  try {
    const userId = req.user._id; // From our verifyJWT middleware
    const { difficulty } = req.body; // e.g., 'Intermediate'

    // Call the AI Agent service to get the dynamic quiz data
    const aiResponse = await generateAssessmentFromAI(MOCK_SKILL_GAPS, difficulty || 'Intermediate');

    // For now, we just forward the AI's response directly to the frontend.
    // In a later phase, we would save this assessment to our database.
    
    return res.status(200).json(
      new ApiResponse(200, aiResponse.data, "Assessment generated successfully")
    );

  } catch (error) {
    next(error);
  }
};

const flagUserForCheating = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { reason } = req.body;

    if (!reason) {
      return next(new ApiError(400, "A reason for flagging is required."));
    }

    // Find the user and update their status to 'blocked'
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { status: 'blocked' },
        $push: { 
          cheatingFlags: {
            reason: reason,
            detectedBy: 'Automated System',
            date: new Date()
          }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(new ApiError(404, "User not found."));
    }

    return res.status(200).json(new ApiResponse(200, { status: updatedUser.status }, "User has been blocked."));

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewAssessment,
  flagUserForCheating
};
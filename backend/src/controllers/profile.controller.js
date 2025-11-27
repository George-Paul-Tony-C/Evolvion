const User = require('../models/user.model.js');
const { analyzeUserProfileFromAI } = require('../services/aiAgentService.js');
const { ApiResponse, ApiError } = require('../utils/ApiHelpers.js');

const analyzeMyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    // Prepare the data to be sent to the AI agent
    const profileDataForAI = {
      jobRole: user.profileData.jobRole || user.role,
      department: user.department,
      yearsOfExperience: user.profileData.yearsOfExperience || 1,
      existingSkills: user.skillAreas?.map(s => `${s.skillName} (Level ${s.skillLevel})`) || [],
      performanceRatings: user.performanceRatings?.map(r => `${r.metric}: ${r.score}/100`) || [],
    };

    // Call the AI service to get the analysis
    const aiResponse = await analyzeUserProfileFromAI(profileDataForAI);

    if (!aiResponse.success || !aiResponse.data.identifiedSkillGaps) {
        return next(new ApiError(500, "Failed to get a valid analysis from the AI service."));
    }

    // Update the user's document in the database with the new AI insights
    user.aiInsights.identifiedSkillGaps = aiResponse.data.identifiedSkillGaps;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
      new ApiResponse(200, user.aiInsights, "Profile analyzed and updated successfully")
    );

  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const { name, department } = req.body;
    const userId = req.user._id;

    if (!name && !department) {
      return next(new ApiError(400, "At least one field (name or department) must be provided."));
    }

    // Create an object with only the fields that are being updated
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (department) fieldsToUpdate.department = department;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: fieldsToUpdate },
      { new: true } // This option returns the updated document
    ).select("-password -refreshToken");

    if (!updatedUser) {
      return next(new ApiError(404, "User not found."));
    }

    return res.status(200).json(
      new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeMyProfile,
  updateMyProfile 
};
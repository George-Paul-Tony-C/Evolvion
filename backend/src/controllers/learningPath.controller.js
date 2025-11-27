const User = require('../models/user.model.js');
const Course = require('../models/course.model.js');
const LearningPath = require('../models/learningPath.model.js');
const { generateLearningPathFromAI } = require('../services/aiAgentService.js');
const { ApiResponse, ApiError } = require('../utils/ApiHelpers.js');

const generateMyLearningPath = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    const skillGaps = user.aiInsights?.identifiedSkillGaps;
    if (!skillGaps || skillGaps.length === 0) {
      return next(new ApiError(400, "No skill gaps identified. Please analyze your profile first."));
    }

    // Fetch all available courses from the database
    const allCourses = await Course.find({});
    // We only need specific fields for the AI prompt
    const coursesForAI = allCourses.map(c => ({ title: c.title, skillTags: c.skillTags }));

    // Call the AI service to get the recommendation
    const aiResponse = await generateLearningPathFromAI(skillGaps, coursesForAI);

    if (!aiResponse.success || !aiResponse.data.recommendedCourses) {
      return next(new ApiError(500, "Failed to get a valid learning path from the AI service."));
    }

    const { pathTitle, pathDescription, recommendedCourses } = aiResponse.data;

    // Match the recommended course titles back to our actual course objects to get their IDs
    const courseDetails = recommendedCourses.map(recCourse => {
      const course = allCourses.find(c => c.title === recCourse.courseTitle);
      return {
        courseId: course ? course._id : null,
        priority: recCourse.priority,
        personalizedReason: recCourse.personalizedReason
      };
    }).filter(c => c.courseId); // Filter out any courses that couldn't be matched

    // Create and save the new learning path
    const newLearningPath = await LearningPath.create({
      userId,
      pathTitle,
      pathDescription,
      recommendedCourses: courseDetails,
      gapsIdentified: skillGaps
    });

    return res.status(201).json(
      new ApiResponse(201, newLearningPath, "Learning path generated and saved successfully")
    );

  } catch (error) {
    next(error);
  }
};

const getMyLearningPath = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find the most recently created learning path for this user.
    // We also populate the course details so we can display course titles.
    const learningPath = await LearningPath.findOne({ userId })
      .sort({ createdAt: -1 }) // Get the newest one
      .populate('recommendedCourses.courseId', 'title'); // Populate course titles

    if (!learningPath) {
      return next(new ApiError(404, "No learning path found for this user. Please generate one."));
    }

    return res.status(200).json(
      new ApiResponse(200, learningPath, "Learning path fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateMyLearningPath,
  getMyLearningPath 
};
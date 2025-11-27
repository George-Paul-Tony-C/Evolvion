const User = require('../models/user.model.js');
const Assessment = require('../models/assessment.model.js');
const ProgressTracking = require('../models/progressTracking.model.js');
const { analyzeProgressFromAI } = require('../services/aiAgentService.js');
const { ApiResponse, ApiError } = require('../utils/ApiHelpers.js');

const processAssessmentResult = async (req, res, next) => {
  try {
    // We now expect the full assessment object from the frontend
    const { assessmentData, userAnswers, score, courseId } = req.body;
    const userId = req.user._id;

    if (!assessmentData || !userAnswers || score === undefined || !courseId) {
      return next(new ApiError(400, "Full assessment data, user answers, score, and course ID are required."));
    }

    // 1. Create and save the full assessment record to the database.
    const newAssessmentRecord = await Assessment.create({
      userId,
      courseId, // We'll use a mock courseId for now
      questions: assessmentData.questions,
      // Map user's answers into the format expected by the schema
      responses: userAnswers.map((answerIndex, questionIndex) => ({
        questionIndex,
        answer: assessmentData.questions[questionIndex].choices[answerIndex]?.option || "No answer",
        // timeTaken could be implemented in a future enhancement
      })),
      proficiencyScores: { overall: score }, // Store the final score
      passingScore: 70, // Example passing score
      difficultyLevel: 'Intermediate',
      completionDate: new Date(),
    });

    // 2. Add a reference to this new assessment record in the user's history.
    await User.findByIdAndUpdate(userId, {
      $push: { assessmentScores: { assessmentId: newAssessmentRecord._id, score, date: new Date() } }
    });

    // 3. Gather past scores for the same course to detect a trend.
    const userWithScores = await User.findById(userId).populate({
        path: 'assessmentScores',
        populate: { path: 'assessmentId', model: 'Assessment', select: 'courseId' }
    });
    
    const relevantScores = userWithScores.assessmentScores
      .filter(as => as.assessmentId?.courseId.toString() === courseId)
      .map(as => as.score);

    // 4. Call the AI Tracker Agent for analysis.
    const aiResponse = await analyzeProgressFromAI(relevantScores);

    if (!aiResponse.success) {
      return next(new ApiError(500, "Failed to get a valid analysis from the AI service."));
    }
    
    const { isPlateauing, interventionSuggestion } = aiResponse.data;

    // 5. If a plateau is detected, log an event.
    if (isPlateauing) {
      await ProgressTracking.findOneAndUpdate(
        { userId, courseId },
        { $push: { events: { type: 'PlateauDetected', details: interventionSuggestion, timestamp: new Date() }}},
        { upsert: true }
      );
    }

    return res.status(200).json(
      new ApiResponse(200, { analysis: aiResponse.data }, "Assessment result processed successfully")
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  processAssessmentResult
};

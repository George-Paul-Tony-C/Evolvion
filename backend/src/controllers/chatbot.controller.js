const { getChatbotResponseFromAI } = require('../services/aiAgentService.js');
const { ApiResponse } = require('../utils/ApiHelpers.js');

const handleChatMessage = async (req, res, next) => {
  try {
    const { history } = req.body; // The conversation history from the frontend
    const user = req.user; // The logged-in user from verifyJWT

    // Create the context object for the AI agent
    const userContext = {
      name: user.name,
      department: user.department,
      // In a real app, this data would be fetched from the database
      skillGaps: user.aiInsights?.identifiedSkillGaps || ['Java', 'SQL Optimization'],
      learningPathTitle: 'Java Upskilling Path' 
    };

    // Call the AI service with the context and history
    const aiResponse = await getChatbotResponseFromAI(userContext, history);

    return res.status(200).json(
      new ApiResponse(200, aiResponse.data, "Chat response successful")
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleChatMessage
};

const axios = require('axios');
const { ApiError } = require('../utils/ApiHelpers.js');

const AI_AGENT_BASE_URL = `http://localhost:${process.env.AI_AGENT_PORT || 8000}/api/agent`;

const agentApiClient = axios.create({
  baseURL: AI_AGENT_BASE_URL,
});

/**
 * Generates a dynamic assessment by calling the AI agent service.
 */
const generateAssessmentFromAI = async (skillGaps, difficulty) => {
  try {
    console.log("Backend: Requesting assessment from AI Agent at", AI_AGENT_BASE_URL);
    const response = await agentApiClient.post('/generate-assessment', {
      skillGaps,
      difficulty,
    });
    console.log("Backend: Received assessment from AI Agent.");
    return response.data;
  } catch (error) {
    console.error("Error communicating with AI Agent:", error.message);
    throw new ApiError(502, "The AI service is currently unavailable. Please try again later.");
  }
};

/**
 * Forwards a chat message to the AI agent service.
 * @param {object} userContext - The user's profile and skill data.
 * @param {object[]} history - The conversation history.
 * @returns {Promise<object>} The chatbot's response.
 */
const getChatbotResponseFromAI = async (userContext, history) => {
  try {
    console.log("Backend: Forwarding chat message to AI Agent...");
    const response = await agentApiClient.post('/chat', {
      context: userContext,
      history: history,
    });
    console.log("Backend: Received chat response from AI Agent.");
    return response.data;
  } catch (error) {
    console.error("Error communicating with AI Agent for chat:", error.message);
    throw new ApiError(502, "The AI assistant is currently unavailable.");
  }
};

/**
 * Sends user profile data to the AI agent for analysis.
 * @param {object} userProfile - The user's profile data.
 * @returns {Promise<object>} The analysis containing identified skill gaps.
 */
const analyzeUserProfileFromAI = async (userProfile) => {
  try {
    console.log("Backend: Requesting profile analysis from AI Agent...");
    const response = await agentApiClient.post('/analyze-profile', {
      profile: userProfile,
    });
    console.log("Backend: Received profile analysis from AI Agent.");
    return response.data;
  } catch (error) {
    console.error("Error communicating with AI Agent for profile analysis:", error.message);
    throw new ApiError(502, "The AI analysis service is currently unavailable.");
  }
};


/**
 * Sends skill gaps and courses to the AI agent to generate a learning path.
 * @param {string[]} skillGaps - The user's identified skill gaps.
 * @param {object[]} courses - A list of available courses.
 * @returns {Promise<object>} The AI-generated learning path.
 */
const generateLearningPathFromAI = async (skillGaps, courses) => {
  try {
    console.log("Backend: Requesting learning path from AI Agent...");
    const response = await agentApiClient.post('/recommend-path', {
      skillGaps,
      courses,
    });
    console.log("Backend: Received learning path from AI Agent.");
    return response.data;
  } catch (error) {
    console.error("Error communicating with AI Agent for path recommendation:", error.message);
    throw new ApiError(502, "The AI recommendation service is currently unavailable.");
  }
};

/**
 * Sends a user's quiz scores to the AI agent for plateau analysis.
 * @param {number[]} scores - A list of the user's recent scores on a topic.
 * @returns {Promise<object>} The AI's analysis of the user's progress.
 */
const analyzeProgressFromAI = async (scores) => {
  try {
    console.log("Backend: Requesting progress analysis from AI Agent...");
    const response = await agentApiClient.post('/analyze-progress', { scores });
    console.log("Backend: Received progress analysis from AI Agent.");
    return response.data;
  } catch (error) {
    console.error("Error communicating with AI Agent for progress analysis:", error.message);
    throw new ApiError(502, "The AI analysis service is currently unavailable.");
  }
};

module.exports = { 
  generateAssessmentFromAI,
  getChatbotResponseFromAI,
  analyzeUserProfileFromAI,
  generateLearningPathFromAI,
  analyzeProgressFromAI 
};


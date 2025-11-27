const User = require('../models/user.model.js');
const SystemMetric = require('../models/systemMetric.model.js');
const { ApiResponse } = require('../utils/ApiHelpers.js');

const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users but exclude their passwords and refresh tokens for security.
    const users = await User.find({}).select("-password -refreshToken");

    return res.status(200).json(
      new ApiResponse(200, users, "All users fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

const getSystemMetrics = async (req, res, next) => {
  try {
    // For this demo, we'll fetch the last 20 metrics, sorted by time.
    // In a real app, you'd likely aggregate this data.
    const metrics = await SystemMetric.find({})
      .sort({ timestamp: -1 })
      .limit(20);
        
    // Let's also add some mock data if the collection is empty
    if (metrics.length === 0) {
      await SystemMetric.create([
        { queueName: 'AssessmentAgent', latency: 1500, errorRate: 2, timestamp: new Date(Date.now() - 3600000 * 3) },
        { queueName: 'ChatbotAgent', latency: 800, errorRate: 1, timestamp: new Date(Date.now() - 3600000 * 3) },
        { queueName: 'AssessmentAgent', latency: 1800, errorRate: 5, timestamp: new Date(Date.now() - 3600000 * 2) },
        { queueName: 'ChatbotAgent', latency: 750, errorRate: 0, timestamp: new Date(Date.now() - 3600000 * 2) },
        { queueName: 'AssessmentAgent', latency: 1600, errorRate: 3, timestamp: new Date(Date.now() - 3600000 * 1) },
        { queueName: 'ChatbotAgent', latency: 900, errorRate: 2, timestamp: new Date(Date.now() - 3600000 * 1) },
      ]);
      const newMetrics = await SystemMetric.find({}).sort({ timestamp: -1 }).limit(20);
      return res.status(200).json(new ApiResponse(200, newMetrics, "Sample metrics fetched successfully"));
    }

    return res.status(200).json(
      new ApiResponse(200, metrics, "System metrics fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers , 
  getSystemMetrics
};

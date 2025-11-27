const { ApiResponse } = require('../utils/ApiHelpers.js');

const getEmployeeDashboardData = (req, res) => {
  // In Phase 1, we return static data.
  // Later, this will fetch dynamic data for the logged-in user (req.user).
  const staticDashboardData = {
    learningPathTitle: "Your Personalized Java Upskilling Path",
    courses: [
      { id: 1, title: "Java Fundamentals", status: "Completed" },
      { id: 2, title: "Object-Oriented Programming in Java", status: "In Progress" },
      { id: 3, title: "Advanced Java Concurrency", status: "Not Started" },
    ],
    welcomeMessage: `Welcome back, ${req.user.name}! Let's continue learning.`
  };

  return res.status(200).json(
    new ApiResponse(200, staticDashboardData, "Dashboard data fetched successfully")
  );
};

module.exports = {
  getEmployeeDashboardData
};

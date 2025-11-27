const users = [
  {
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "password": "hexapathNaveenaa",
    "role": "employee",
    "department": "Software",
    "profileData": {
      "yearsOfExperience": 5,
      "certifications": ["AWS Certified Developer", "Scrum Master"],
      "jobRole": "Consultant"
    },
    "skillVector": [0.7, 0.6, 0.8],
    "learningStyle": "Visual",
    "performanceRatings": [
      {"metric": "KPI Score", "score": 85, "date": "2024-12-01T00:00:00.000Z"},
      {"metric": "Task Completion", "score": 90, "date": "2025-01-15T00:00:00.000Z"}
    ],
    "learningPreferences": ["Courses", "Webinars"],
    "assessmentScores": [
      {"assessmentId": null, "score": 78, "date": "2025-02-20T00:00:00.000Z"}
    ],
    "skillAreas": [
      {"skillName": "Java", "skillLevel": 7},
      {"skillName": "Concurrency", "skillLevel": 5},
      {"skillName": "React.js", "skillLevel": 6}
    ],
    "learningHistory": [
      {"courseId": null, "completed": true, "startDate": "2024-10-01T00:00:00.000Z", "endDate": "2024-10-20T00:00:00.000Z"}
    ],
    "progress": "In Progress",
    "aiInsights": {
      "identifiedSkillGaps": ["Concurrency"],
      "improvementRecommendations": ["Complete advanced concurrency course"]
    },
    "status": "active",
    "cheatingFlags": [],
    "sorryRequests": []
  },
  {
    "name": "Bob Smith",
    "email": "bob.smith@example.com",
    "password": "hexapathNaveenaa",
    "role": "employee",
    "department": "Software",
    "profileData": {
      "yearsOfExperience": 3,
      "certifications": ["Oracle Certified Java Programmer"],
      "jobRole": "Consultant"
    },
    "skillVector": [0.5, 0.4, 0.7],
    "learningStyle": "Auditory",
    "performanceRatings": [
      {"metric": "KPI Score", "score": 70, "date": "2025-01-10T00:00:00.000Z"}
    ],
    "learningPreferences": ["Courses", "Reading"],
    "assessmentScores": [
      {"assessmentId": null, "score": 65, "date": "2025-03-01T00:00:00.000Z"}
    ],
    "skillAreas": [
      {"skillName": "Java", "skillLevel": 5},
      {"skillName": "Concurrency", "skillLevel": 3},
      {"skillName": "React.js", "skillLevel": 4}
    ],
    "learningHistory": [
      {"courseId": null, "completed": true, "startDate": "2024-11-01T00:00:00.000Z", "endDate": "2024-11-15T00:00:00.000Z"}
    ],
    "progress": "Not Started",
    "aiInsights": {
      "identifiedSkillGaps": ["Concurrency", "React.js"],
      "improvementRecommendations": ["Take concurrency fundamentals", "React.js beginner tutorials"]
    },
    "status": "active",
    "cheatingFlags": [],
    "sorryRequests": []
  },
  {
    "name": "Carol Lee",
    "email": "carol.lee@example.com",
    "password": "hexapathNaveenaa",
    "role": "employee",
    "department": "HR",
    "profileData": {
      "yearsOfExperience": 7,
      "certifications": ["SHRM-CP"],
      "jobRole": "HR Manager"
    },
    "skillVector": [0.8, 0.7, 0.6],
    "learningStyle": "Kinesthetic",
    "performanceRatings": [
      {"metric": "Employee Satisfaction", "score": 88, "date": "2025-02-05T00:00:00000Z"}
    ],
    "learningPreferences": ["Webinars", "Courses"],
    "assessmentScores": [
      {"assessmentId": null, "score": 80, "date": "2025-02-28T00:00:00.000Z"}
    ],
    "skillAreas": [
      {"skillName": "Recruitment", "skillLevel": 8},
      {"skillName": "Employee Engagement", "skillLevel": 7}
    ],
    "learningHistory": [
      {"courseId": null, "completed": true, "startDate": "2024-09-01T00:00:00.000Z", "endDate": "2024-09-25T00:00:00.000Z"}
    ],
    "progress": "Completed",
    "aiInsights": {
      "identifiedSkillGaps": [],
      "improvementRecommendations": []
    },
    "status": "active",
    "cheatingFlags": [],
    "sorryRequests": []
  },
  {
    "name": "David Nguyen",
    "email": "david.nguyen@example.com",
    "password": "hexapathNaveenaa",
    "role": "employee",
    "department": "Software",
    "profileData": {
      "yearsOfExperience": 2,
      "certifications": [],
      "jobRole": "Consultant"
    },
    "skillVector": [0.4, 0.3, 0.5],
    "learningStyle": "Visual",
    "performanceRatings": [
      {"metric": "KPI Score", "score": 60, "date": "2025-01-18T00:00:00.000Z"}
    ],
    "learningPreferences": ["Reading", "Courses"],
    "assessmentScores": [
      {"assessmentId": null, "score": 55, "date": "2025-03-10T00:00:00.000Z"}
    ],
    "skillAreas": [
      {"skillName": "Java", "skillLevel": 4},
      {"skillName": "React.js", "skillLevel": 3}
    ],
    "learningHistory": [
      {"courseId": null, "completed": true, "startDate": "2025-02-01T00:00:00.000Z", "endDate": null}
    ],
    "progress": "Not Started",
    "aiInsights": {
      "identifiedSkillGaps": ["Java", "React.js"],
      "improvementRecommendations": ["Start Java beginner course", "React.js fundamentals"]
    },
    "status": "active",
    "cheatingFlags": [
      {"date": "2025-03-15T00:00:00.000Z", "reason": "Unusual rapid answers", "detectedBy": "Assessment Agent"}
    ],
    "sorryRequests": [
      {"requestDate": "2025-03-20T00:00:00.000Z", "message": "I apologize and request access", "status": "pending"}
    ]
  },
  {
    "name": "Eva Martinez",
    "email": "eva.martinez@example.com",
    "password": "hexapathNaveenaa",
    "role": "employee",
    "department": "Software",
    "profileData": {
      "yearsOfExperience": 4,
      "certifications": ["Certified Scrum Master"],
      "jobRole": "Consultant"
    },
    "skillVector": [0.6, 0.55, 0.7],
    "learningStyle": "Auditory",
    "performanceRatings": [
      {"metric": "KPI Score", "score": 75, "date": "2025-02-25T00:00:00.000Z"}
    ],
    "learningPreferences": ["Courses", "Webinars", "Reading"],
    "assessmentScores": [
      {"assessmentId": null, "score": 70, "date": "2025-03-12T00:00:00.000Z"}
    ],
    "skillAreas": [
      {"skillName": "Java", "skillLevel": 6},
      {"skillName": "Concurrency", "skillLevel": 4},
      {"skillName": "React.js", "skillLevel": 5}
    ],
    "learningHistory": [
      {"courseId": null, "completed": true, "startDate": "2024-12-10T00:00:00.000Z", "endDate": "2025-01-05T00:00:00.000Z"}
    ],
    "progress": "In Progress",
    "aiInsights": {
      "identifiedSkillGaps": ["Concurrency"],
      "improvementRecommendations": ["Complete concurrency intermediate course"]
    },
    "status": "active",
    "cheatingFlags": [],
    "sorryRequests": []
  },
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "hexapathNaveenaa",
    "role": "admin",
    "department": "Administration",
    "profileData": {
      "yearsOfExperience": 10,
      "certifications": ["ITIL", "PMP"],
      "jobRole": "System Administrator"
    },
    "skillVector": [],
    "learningStyle": null,
    "performanceRatings": [],
    "learningPreferences": [],
    "assessmentScores": [],
    "skillAreas": [],
    "learningHistory": [],
    "progress": null,
    "aiInsights": {
      "identifiedSkillGaps": [],
      "improvementRecommendations": []
    },
    "status": "active",
    "cheatingFlags": [],
    "sorryRequests": []
  }
]

module.exports = users;
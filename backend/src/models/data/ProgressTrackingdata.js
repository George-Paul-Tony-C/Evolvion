const progressTracking = [
  {
    "userId": "6890ad791d4869cd6b65c879",  
    "courseId": "6890aee61d4869cd6b65c8ef",
    "currentProgress": 70,
    "completionStatus": "In Progress",
    "completionDate": null,
    "feedback": "Working well through Java core concepts.",
    "lastUpdated": "2025-03-28T00:00:00.000Z",
    "events": [
      {"type": "course_started", "timestamp": "2025-03-01T00:00:00.000Z", "details": "Started Java Basics course."},
      {"type": "module_completed", "timestamp": "2025-03-20T00:00:00.000Z", "details": "Completed modules on variables and control flow."},
      {"type": "quiz_passed", "timestamp": "2025-03-25T00:00:00.000Z", "details": "Passed introductory Java quiz."}
    ]
  },
  {
    "userId": "6890ad791d4869cd6b65c87a", 
    "courseId": "6890aee61d4869cd6b65c8f1",
    "currentProgress": 0,
    "completionStatus": "Not Started",
    "completionDate": null,
    "feedback": "",
    "lastUpdated": "2025-03-10T00:00:00.000Z",
    "events": []
  },
  {
    "userId": "6890ad791d4869cd6b65c87b", 
    "courseId": "6890aee61d4869cd6b65c8f2",
    "currentProgress": 100,
    "completionStatus": "Completed",
    "completionDate": "2025-03-30T00:00:00.000Z",
    "feedback": "Gained strong concurrency fundamentals.",
    "lastUpdated": "2025-03-30T00:00:00.000Z",
    "events": [
      {"type": "course_started", "timestamp": "2025-02-10T00:00:00.000Z", "details": "Started concurrency fundamentals."},
      {"type": "course_completed", "timestamp": "2025-03-30T00:00:00.000Z", "details": "Completed concurrency fundamentals course."}
    ]
  },
  {
    "userId": "6890ad791d4869cd6b65c87c", 
    "courseId": "6890aee61d4869cd6b65c8f0",
    "currentProgress": 25,
    "completionStatus": "In Progress",
    "completionDate": null,
    "feedback": "Struggling with advanced concurrency topics.",
    "lastUpdated": "2025-03-27T00:00:00.000Z",
    "events": [
      {"type": "course_started", "timestamp": "2025-03-15T00:00:00.000Z", "details": "Started advanced concurrency course."},
      {"type": "module_completed", "timestamp": "2025-03-25T00:00:00.000Z", "details": "Completed first concurrency module."}
    ]
  },
  {
    "userId": "6890ad791d4869cd6b65c87d",
    "courseId": "6890aee61d4869cd6b65c8f4",
    "currentProgress": 60,
    "completionStatus": "In Progress",
    "completionDate": null,
    "feedback": "Improving Agile knowledge steadily.",
    "lastUpdated": "2025-03-28T00:00:00.000Z",
    "events": [
      {"type": "course_started", "timestamp": "2025-03-08T00:00:00.000Z", "details": "Started SCRUM Master training."},
      {"type": "quiz_passed", "timestamp": "2025-03-22T00:00:00.000Z", "details": "Passed SCRUM basics quiz."}
    ]
  }
]

module.exports = progressTracking;
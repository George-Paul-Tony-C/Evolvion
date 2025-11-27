const Assessment = [
  {
    "userId": "6890ad791d4869cd6b65c879",  
    "courseId": "6890aee61d4869cd6b65c8ef",  
    "questions": [
      {
        "questionText": "What is Java?",
        "choices": [
          {"option": "Programming Language", "isCorrect": true},
          {"option": "Operating System", "isCorrect": false},
          {"option": "Browser", "isCorrect": false}
        ]
      },
      {
        "questionText": "What is JVM?",
        "choices": [
          {"option": "Java Virtual Machine", "isCorrect": true},
          {"option": "Java Vendor Machine", "isCorrect": false},
          {"option": "Java Variable Method", "isCorrect": false}
        ]
      }
    ],
    "responses": [
      {"questionIndex": 0, "answer": "Programming Language", "timeTaken": 15},
      {"questionIndex": 1, "answer": "Java Virtual Machine", "timeTaken": 20}
    ],
    "proficiencyScores": {"Java": 90, "JVM Basics": 85},
    "assessmentDate": "2025-03-15T00:00:00.000Z",
    "passingScore": 70,
    "difficultyLevel": "Easy",
    "feedback": "Good understanding of basic Java concepts.",
    "isCheatingDetected": false,
    "completionDate": "2025-03-15T00:00:00.000Z"
  },
  {
    "userId": "6890ad791d4869cd6b65c87a",  
    "courseId": "6890aee61d4869cd6b65c8f1",  
    "questions": [
      {
        "questionText": "What is React?",
        "choices": [
          {"option": "JavaScript library", "isCorrect": true},
          {"option": "Database", "isCorrect": false},
          {"option": "Web server", "isCorrect": false}
        ]
      },
      {
        "questionText": "Components in React",
        "choices": [
          {"option": "Reusable UI pieces", "isCorrect": true},
          {"option": "API endpoints", "isCorrect": false},
          {"option": "CSS files", "isCorrect": false}
        ]
      }
    ],
    "responses": [
      {"questionIndex": 0, "answer": "JavaScript library", "timeTaken": 18},
      {"questionIndex": 1, "answer": "Reusable UI pieces", "timeTaken": 22}
    ],
    "proficiencyScores": {"React.js": 80},
    "assessmentDate": "2025-03-10T00:00:00.000Z",
    "passingScore": 65,
    "difficultyLevel": "Medium",
    "feedback": "Good grasp of React basics.",
    "isCheatingDetected": false,
    "completionDate": "2025-03-10T00:00:00.000Z"
  },
  {
    "userId": "6890ad791d4869cd6b65c87b",  
    "courseId": "6890aee61d4869cd6b65c8f2",  
    "questions": [
      {
        "questionText": "Concurrency is important because?",
        "choices": [
          {"option": "It ensures thread safety", "isCorrect": true},
          {"option": "It slows down applications", "isCorrect": false},
          {"option": "It replaces databases", "isCorrect": false}
        ]
      }
    ],
    "responses": [
      {"questionIndex": 0, "answer": "It ensures thread safety", "timeTaken": 30}
    ],
    "proficiencyScores": {"Concurrency": 78},
    "assessmentDate": "2025-02-15T00:00:00.000Z",
    "passingScore": 70,
    "difficultyLevel": "Medium",
    "feedback": "Needs improvement in concurrency concepts.",
    "isCheatingDetected": false,
    "completionDate": "2025-02-15T00:00:00.000Z"
  },
  {
    "userId": "6890ad791d4869cd6b65c87c",
    "courseId": "6890aee61d4869cd6b65c8f0",  
    "questions": [
      {
        "questionText": "Thread synchronization is?",
        "choices": [
          {"option": "A mechanism to control access", "isCorrect": true},
          {"option": "A database functionality", "isCorrect": false},
          {"option": "A UI library", "isCorrect": false}
        ]
      }
    ],
    "responses": [
      {"questionIndex": 0, "answer": "A mechanism to control access", "timeTaken": 7}  
    ],
    "proficiencyScores": {"Concurrency": 55},
    "assessmentDate": "2025-03-18T00:00:00.000Z",
    "passingScore": 70,
    "difficultyLevel": "Hard",
    "feedback": "Below passing score, suggest refresher.",
    "isCheatingDetected": true,
    "completionDate": "2025-03-18T00:00:00.000Z"
  },
  {
    "userId": "6890ad791d4869cd6b65c87d", 
    "courseId": "6890aee61d4869cd6b65c8f4",  
    "questions": [
      {
        "questionText": "What is Scrum?",
        "choices": [
          {"option": "Agile framework", "isCorrect": true},
          {"option": "Database", "isCorrect": false},
          {"option": "Programming language", "isCorrect": false}
        ]
      }
    ],
    "responses": [
      {"questionIndex": 0, "answer": "Agile framework", "timeTaken": 14}
    ],
    "proficiencyScores": {"Agile": 85},
    "assessmentDate": "2025-03-05T00:00:00.000Z",
    "passingScore": 70,
    "difficultyLevel": "Medium",
    "feedback": "Good understanding of Agile concepts.",
    "isCheatingDetected": false,
    "completionDate": "2025-03-05T00:00:00.000Z"
  }
]

module.exports = Assessment;
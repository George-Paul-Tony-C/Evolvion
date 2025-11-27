const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{ 
    questionText: String, 
    choices: [{ option: String, isCorrect: Boolean }] 
  }],
  responses: [{ 
    questionIndex: Number, 
    answer: String, 
    timeTaken: Number // For cheating detection (e.g., too fast)
  }],
  proficiencyScores: { type: Object, default: {} }, // From Assessment Agent, e.g., {topicA: 85}
  assessmentDate: { type: Date, default: Date.now },
  passingScore: { type: Number, required: true },
  difficultyLevel: { type: String, required: true }, // e.g., 'Easy'
  feedback: { type: String, default: '' },
  isCheatingDetected: { type: Boolean, default: false }, // Triggers User flag if true
  completionDate: { type: Date }
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);
module.exports = Assessment;

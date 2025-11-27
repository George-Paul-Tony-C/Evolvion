const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pathTitle: { type: String, required: true },
  pathDescription: { type: String, required: true },
  recommendedCourses: [{ 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
    priority: { type: Number, default: 1 }, 
    personalizedReason: String // Narrative from agent
  }],
  generatedAt: { type: Date, default: Date.now },
  aiModelInsights: { type: Object, default: {} }, // Agent outputs
  gapsIdentified: { type: [String] } // e.g., ['Java Concurrency']
}, { timestamps: true });

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;

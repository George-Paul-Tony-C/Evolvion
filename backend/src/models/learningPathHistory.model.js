const mongoose = require('mongoose');

const learningPathHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  learningPathId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath', required: true },
  completionStatus: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  completionDate: { type: Date },
  effectivenessScore: { type: Number, default: 0 }, // 0-100
  feedback: { type: String, default: '' }
}, { timestamps: true });

const LearningPathHistory = mongoose.model('LearningPathHistory', learningPathHistorySchema);
module.exports = LearningPathHistory;

const mongoose = require('mongoose');

const progressTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  currentProgress: { type: Number, required: true }, // Percentage (0-100)
  completionStatus: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  completionDate: { type: Date },
  feedback: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now },
  events: [{ type: String, timestamp: Date, details: String }] // From Tracker Agent, e.g., 'Plateau detected'
}, { timestamps: true });

const ProgressTracking = mongoose.model('ProgressTracking', progressTrackingSchema);
module.exports = ProgressTracking;

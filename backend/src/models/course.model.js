const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // In minutes
  difficultyLevel: { type: String, required: true }, // e.g., 'Beginner'
  prerequisites: [{ 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
    title: String 
  }],
  learningObjectives: { type: [String], required: true },
  contentFormat: { type: String, default: 'Video' }, // e.g., 'Video', 'Article'
  estimatedTime: { type: Number, required: true }, // In hours
  skillTags: { type: [String] }, // e.g., ['Java', 'Concurrency']
  metadata: { type: Object, default: {} } // For agent inputs
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

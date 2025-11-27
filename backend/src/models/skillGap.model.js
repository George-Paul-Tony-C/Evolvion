const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requiredSkills: [{ skillName: String, requiredLevel: Number }],
  userSkills: [{ skillName: String, userLevel: Number }],
  detectedGaps: [{ skillName: String, gapLevel: Number }], // From Profile/Assessment Agents
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const SkillGap = mongoose.model('SkillGap', skillGapSchema);
module.exports = SkillGap;

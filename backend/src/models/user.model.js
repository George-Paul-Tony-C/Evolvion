const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'] },
  role: { type: String, enum: ['employee', 'admin'], required: true },
  department: { type: String, required: true },
  profileData: { type: Object, default: {} },
  skillVector: { type: [Number], default: [] },
  assessmentScores: [{
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    score: Number,
    date: Date
  }],
  learningHistory: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    completed: Boolean,
    startDate: Date,
    endDate: Date
  }],
aiInsights: {
    identifiedSkillGaps: [String],
    improvementRecommendations: [String]
  },
  status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  cheatingFlags: [{ date: Date, reason: String, detectedBy: String }],
  sorryRequests: [{
    requestDate: Date,
    message: String,
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' }
  }],
  refreshToken: { type: String }
}, { timestamps: true });

// --- Mongoose Middleware & Methods ---

// Hash password before saving the document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  // `this` refers to the user document
  return await bcrypt.compare(password, this.password);
};

// Method to generate a JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

// Method to generate a JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};


// --- Model Creation ---
const User = mongoose.model('User', userSchema);

module.exports = User;

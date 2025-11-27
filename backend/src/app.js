const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser

// --- Route Imports ---
const authRouter = require('./routes/auth.routes.js');
const employeeRouter = require('./routes/employee.routes.js');
const userRouter = require('./routes/user.routes.js');
const assessmentRouter = require('./routes/assessment.routes.js');
const adminRouter = require('./routes/admin.routes.js');
const progressRouter = require('./routes/progress.routes.js'); 
const chatbotRouter = require('./routes/chatbot.routes.js'); 
const profileRouter = require('./routes/profile.routes.js'); 
const learningPathRouter = require('./routes/learningPath.routes.js');
const trackerRouter = require('./routes/tracker.routes.js');
const requestRouter = require('./routes/request.routes.js');
const historyRouter = require('./routes/history.routes.js');

const app = express();

// --- Middlewares ---
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser()); // Use cookie-parser middleware

// --- Route Declarations ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/assessment", assessmentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/chat", chatbotRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/learning-path", learningPathRouter);
app.use("/api/v1/tracker", trackerRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/history/assessment", historyRouter);

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend service is running smoothly.'
  });
});

module.exports = app;

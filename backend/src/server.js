// Load environment variables from .env file into process.env
require('dotenv').config({ path: './.env' });

const app = require('./app');
const connectDB = require('./config/db');

// Connect to the database and then start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server is running on port: ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed! Server will not start.", err);
  });

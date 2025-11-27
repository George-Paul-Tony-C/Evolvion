// File: backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`\n✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
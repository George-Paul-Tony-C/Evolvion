const mongoose = require('mongoose');

const systemMetricSchema = new mongoose.Schema({
  queueName: { type: String, required: true }, // e.g., 'ProfileAgentQueue'
  latency: { type: Number, required: true }, // In ms
  errorRate: { type: Number, required: true }, // Percentage
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const SystemMetric = mongoose.model('SystemMetric', systemMetricSchema);
module.exports = SystemMetric;

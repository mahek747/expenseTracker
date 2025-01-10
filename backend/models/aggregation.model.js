const mongoose = require('mongoose');

// Define Aggregation Result Schema
const aggregationResultSchema = new mongoose.Schema({
    category: String,
    totalAmount: Number,
    count: Number,
    startDate: Date,
    endDate: Date,
}, { timestamps: true });

// Model for aggregation result
module.exports = mongoose.model('AggregationResult', aggregationResultSchema);

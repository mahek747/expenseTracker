const mongoose = require('mongoose');

const aggregationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      default: 0, 
    },
    count: {
      type: Number,
      required: [true, 'Count is required'],
      default: 0, 
    },
    startDate: {
      type: Date,
      required: false, 
    },
    endDate: {
      type: Date,
      required: false, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Aggregation', aggregationSchema);

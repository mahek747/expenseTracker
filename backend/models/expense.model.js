const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    title: {
        type: String,
        required: [true, 'Expense title is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit'],
        required: [true, 'Payment method is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);

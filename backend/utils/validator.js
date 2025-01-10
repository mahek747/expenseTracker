const { body, param, query } = require('express-validator');

const validateCreateExpense = [
    body('amount')
        .isNumeric()
        .withMessage('Amount must be a number')
        .notEmpty()
        .withMessage('Amount is required'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters long'),

    body('paymentMethod')
        .isIn(['cash', 'credit'])
        .withMessage('Payment method must be either "cash" or "credit"')
        .notEmpty()
        .withMessage('Payment method is required'),

    body('date')
        .isISO8601()
        .withMessage('Date must be in ISO 8601 format')
        .notEmpty()
        .withMessage('Date is required'),
];

const validateUpdateExpense = [
    body('amount')
        .optional()
        .isNumeric()
        .withMessage('Amount must be a number')
        .notEmpty()
        .withMessage('Amount is required'),

    body('category')
        .optional()
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters long'),

    body('paymentMethod')
        .optional()
        .isIn(['cash', 'credit'])
        .withMessage('Payment method must be either "cash" or "credit"')
        .notEmpty()
        .withMessage('Payment method is required'),

    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be in ISO 8601 format')
        .notEmpty()
        .withMessage('Date is required'),
];

const validateDeleteExpense = [
    param('id')
        .isMongoId()
        .withMessage('Invalid expense ID')
        .notEmpty()
        .withMessage('Expense ID is required'),
];

const validateGetExpenses = [
    query('category')
        .optional()
        .isString()
        .withMessage('Category must be a string'),

    query('dateRange')
        .optional()
        .isArray()
        .withMessage('Date range must be an array in the format [startDate, endDate]'),

    query('sortBy')
        .optional()
        .isIn(['amount', 'date'])
        .withMessage('Sort by must be either "amount" or "date"'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either "asc" or "desc"'),

    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be an integer greater than 0'),

    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be an integer greater than 0'),
];

module.exports = {
    validateCreateExpense,
    validateUpdateExpense,
    validateDeleteExpense,
    validateGetExpenses,
};

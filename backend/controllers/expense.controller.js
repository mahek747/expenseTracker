const Expense = require("../models/expense.model");

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - paymentMethod
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit]
 *               date:
 *                 type: string
 *                 format: date
 *             example:
 *               title: "Lunch at restaurant"
 *               amount: 50
 *               category: "Food"
 *               paymentMethod: "cash"
 *               date: "2025-01-01"
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, paymentMethod, date } = req.body;

        // Ensure userId is available
        if (!req.userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const expense = new Expense({
            userId: req.userId, // User ID from middleware
            title,
            amount,
            category,
            paymentMethod,
            date,
        });

        const savedExpense = await expense.save();
        return res.status(201).json({ message: "Expense added successfully", expense: savedExpense });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter up to this date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [amount, date]
 *         description: Sort results by amount or date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: A list of expenses
 *       500:
 *         description: Internal server error
 */
const getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate, sortBy, page = 1, limit = 10 } = req.query;

        // Filter based on query parameters
        const filter = { userId: req.userId }; // Only fetch expenses for the logged-in user
        if (category) filter.category = category;
        if (startDate && endDate) {
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Sorting and pagination
        const sort = sortBy ? { [sortBy]: 1 } : {};
        const expenses = await Expense.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit, 10));

        const totalExpenses = await Expense.countDocuments(filter);

        return res.status(200).json({
            totalExpenses,
            totalPages: Math.ceil(totalExpenses / limit),
            currentPage: parseInt(page, 10),
            expenses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch expenses" });
    }
};

/**
 * @swagger
 * /expenses/{id}:
 *   patch:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const expense = await Expense.findOneAndUpdate(
            { _id: id, userId: req.userId }, // Ensure user owns the expense
            updates,
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update expense" });
    }
};

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findOneAndDelete({ _id: id, userId: req.userId }); // Ensure user owns the expense
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete expense" });
    }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };

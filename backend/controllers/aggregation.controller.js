const Expense = require('../models/expense.model');
const Aggregation = require('../models/aggregation.model'); 

/**
 * @swagger
 * /aggregate/by-category:
 *   get:
 *     summary: Get total expenses grouped by category
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from this date (optional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter up to this date (optional)
 *     responses:
 *       200:
 *         description: Aggregated total expenses by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                 totalAmount:
 *                   type: number
 *                 count:
 *                   type: number
 *       500:
 *         description: Failed to aggregate expenses
 */


const aggregateByCategory = async (req, res) => {
    console.log('aggregateByCategory controller called');
    try {
        const result = await Expense.aggregate([
            { $group: { _id: '$category', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
        ]);
        console.log('Aggregation result:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in aggregation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    aggregateByCategory
};

module.exports = { aggregateByCategory };

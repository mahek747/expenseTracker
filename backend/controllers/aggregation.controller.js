const Expense = require('../models/expense.model');
const AggregationResult = require('../models/aggregation.model'); 

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
    try {
        const { startDate, endDate } = req.query;

        // Building the aggregation pipeline
        let matchStage = {};
        
        if (startDate && endDate) {
            matchStage.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const aggregationPipeline = [
            {
                $match: matchStage, // Filter by date range if provided
            },
            {
                $group: {
                    _id: '$category', // Group by the category field
                    totalAmount: { $sum: '$amount' }, // Sum the amounts in each group
                    count: { $sum: 1 }, // Count the number of expenses in each group
                },
            },
            {
                $project: {
                    category: '$_id', // Rename _id to category
                    totalAmount: 1, // Include totalAmount in the result
                    count: 1, // Include the count of expenses
                    _id: 0, // Remove the default _id field
                },
            },
            {
                $sort: {
                    totalAmount: -1, // Sort by totalAmount in descending order
                },
            },
        ];

        // Execute aggregation
        const result = await Expense.aggregate(aggregationPipeline);

        // Optional: Save the result in AggregationResult model
        result.forEach(async (aggResult) => {
            const newAggregation = new AggregationResult({
                category: aggResult.category,
                totalAmount: aggResult.totalAmount,
                count: aggResult.count,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            });

            await newAggregation.save(); // Save aggregated result if needed
        });

        res.status(200).json({
            message: 'Aggregated results',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to aggregate expenses' });
    }
};

// Other aggregation methods (optional) can go here, if needed

module.exports = { aggregateByCategory };

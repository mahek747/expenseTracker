const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expense.controller");
const authenticate = require("../middlewares/auth");

const router = express.Router();

// Use authenticate middleware
router.post("/add", authenticate, addExpense);
router.get("/expenses", authenticate, getExpenses);
router.patch("/expenses/:id", authenticate, updateExpense);
router.delete("/expenses/:id", authenticate, deleteExpense);

module.exports = router;

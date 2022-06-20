import express from "express";
import { getAllExpenses, newExpense, showExpense, deleteExpense, editExpense } from "../controllers/Expense.js";

const router = express.Router();

router.get('/', getAllExpenses);

router.post('/new', newExpense);

router.get('/:id', showExpense);

router.put('/:id/edit', editExpense)

router.delete('/:id', deleteExpense);



export default router;
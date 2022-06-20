import mongoose from "mongoose";
import Expense from "../models/Expense.js";

export const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({});
        res.status(200).json(expenses);
    } catch (error) {
        next(error)
    }
}

export const newExpense = async (req, res, next) => {
    try{
        const expense = new Expense(req.body)
        console.log(expense);
        console.log(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch(error){
        next(error)
    }
}

export const showExpense = async (req, res, next) => {
    const {id} = req.params;
    try{
        const expense = await Expense.findById(id);
        res.status(200).json(expense);
    } catch(error){
        next(error)
    }
}

export const deleteExpense = async (req, res, next) => {
    const {id} = req.params;
    try{
        await Expense.findOneAndDelete({_id: id});
        res.status(200).send("Item Deleted");
    } catch(error){
        next(error)
    }
}

export const editExpense = async (req, res, next) => {
    const {id} = req.params;
    try {
        const updatedExpense = await Expense.findOneAndUpdate({_id: id}, req.body, {returnDocument: "after"});
        res.status(200).json(updatedExpense);
    } catch (error) {
        next(error)
    }
}
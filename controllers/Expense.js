import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import User from "../models/User.js";

export const getAllExpenses = async (req, res, next) => {
    try {
        // console.log("Req in expenses", req.headers);
        const expenses = await Expense.find({});
        res.status(200).json(expenses);
    } catch (error) {
        next(error)
    }
}

export const getUserExpenses = async (req, res, next) => {
    try {
        const {username} = req.body;
        if(!username) throw new Error('Please login first');
        const user = await User.findOne({username}).populate('expenses');
        if(!user) throw new Error('User not found');
        console.log(user);
        // const expenses = user.populate('expenses');
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const newExpense = async (req, res, next) => {
    try{
        const expense = new Expense(req.body)
        const user = await User.findOne({username: req.body.username});
        console.log("User in backend: ", user);
        user.expenses.push(expense);
        // console.log(expense);
        // console.log(req.body);
        await user.save();
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
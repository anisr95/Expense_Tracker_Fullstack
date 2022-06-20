import mongoose from "mongoose";
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        required: true
    },
    category: {
        type: String
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
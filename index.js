import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Expense from './models/Expense.js';
import expensesRoute from './routes/expenses.js'
// import userRoute from './routes/user.js'
// import authRoute from './routes/auth.js'
// import User from './models/User.js'

dotenv.config();
const app = express();



import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbURL = process.env.DB_URL || "moongodb://localhost:27017/ExpenseTrackerDB";


mongoose.connect(dbURL).then(() => console.log("Mongo Server Connected")).catch((error) => console.log(error));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('/', express.static(path.join(__dirname, '/client/build')));
// app.use(express.bodyParser());

app.use('/expenses', expensesRoute);
// app.use('user', userRoute);
// app.use('/auth', authRoute);


app.get('/login', (req, res, next) => {
    res.send("Login Page");
})

// __dirname = path.resolve(path.dirname(''));
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get('*', async (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
}
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(path.join(__dirname, "client", "build", "index.html"));
    // console.log(__dirname)
});
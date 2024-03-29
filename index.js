import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Expense from './models/Expense.js';
import expensesRoute from './routes/expenses.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import User from './models/User.js'
import session from 'express-session'
import {protect, test} from './middleware/authMiddleware.js';

dotenv.config();
const app = express();



import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbURL = process.env.DB_URL || "moongodb://localhost:27017/ExpenseTrackerDB";


mongoose.connect(dbURL).then(() => console.log("Mongo Server Connected")).catch((error) => console.log(error));

// const myExpense = new Expense({
//     item: "iPhone",
//     amount: 1200,
//     date: new Date()
// });

// await myExpense.save();

// const newUser = new User({
//     username: "Sina",
//     password: "sina123"
// })

// await newUser.save();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret: "mysecret", resave: false, saveUninitialized: false}))
// app.use('/', express.static(path.join(__dirname, '/client/build')));
// app.use(express.bodyParser());



app.use('/expenses', expensesRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);



app.get('/login', (req, res, next) => {
    res.send("Login Page");
})

app.get('/secret', test, (req, res, next) => {
    // if(req.session.user_id){
    //     console.log("Hahaaa");
    //     return res.send("This is my secret");
    // }
    // res.send("Sorry no secret for you");
    return res.send("Successful");
})

app.use((err, req, res, next) => {
    console.log("This is error in Err Handler", err);
    console.log("***************************")
    console.dir(err.message);
    console.dir(err.statusCode);
    console.log("***************************")
    res.status(err.statusCode).json(err.message);
    // res.statusCode(err.statusCode).json(err.message);
    // res.json(err.message)
    // res.json(err);
    // console.dir(err);
})



// __dirname = path.resolve(path.dirname(''));
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
}
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(__dirname)
});
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ExpressError from '../utils/ExpressError.js';


// export const regiterNewUser = async (req, res, next) {

// }

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET);
}

export const register = async (req, res, next) => {
    try{
        const existingUser = await User.findOne({username: req.body.username});
        // if(existingUser) throw new Error('User Already Exists');
        if(existingUser) throw new ExpressError('User Already Exists. Username MUST be unique', 404);

        if(req.body.password.length === 0) throw new ExpressError("Password can not be empty", 400);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })
        await newUser.save();
        // req.session.user_id = newUser._id;
        // req.session.username = newUser.username;
        res.status(201).json({newUser, token: generateToken(newUser._id) });
    } catch(error){
        next(error);
    }
    
}

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username})
        if(!user) throw new ExpressError("User not found", 404);
        if(password.length === 0) throw new ExpressError("Password can not be empty", 400);
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) throw new ExpressError("Incorrect Password", 401)
        // console.log("In Login Request: ", req.headers);
        
        if(isPasswordCorrect){
            // req.session.user_id = user._id;
            // req.session.username = user.username;
            // console.log(req.session);
            // console.log("Password is Correct");
            const token = generateToken(user._id);
            req.userToken = token;
            // console.log(token);
            
            return res.status(200).json({user, token});
        } else{
            return res.status(401).send("Incorrect");
        }
    } catch (error) {
        next(error)
    }
}
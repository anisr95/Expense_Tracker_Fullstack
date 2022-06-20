// import User from '../models/User.js'
// import bcrypt from 'bcrypt';

// export const register = async (req, res, next) => {
//     try{

//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const newUser = new User({
//             username: req.body.username,
//             password: hashedPassword
//         })
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch(error){
//         next(error);
//     }
    
// }

// export const login = async (req, res, next) => {
//     try {
//         const {username, password} = req.body;
//         const user = await User.findOne({username})
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if(isPasswordCorrect){
//             return res.status(200).json("Login Successful");
//         } else{
//             return res.status(400).send("Incorrect");
//         }
//     } catch (error) {
//         next(error)
//     }
// }
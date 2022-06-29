import User from "../models/User.js";

export const getUser = async (req, res, next) => {
    try {
        
        const {id} = req.params;
    const user = await User.findById(id)
    res.status(200).json(user);
    } catch (error) {
        next(error)
    }
    
}

export const findUserByUsername = async (req, res, next) => {
    try {
        console.log("Req Body: ", req.body);
        const {username} = req.body;
        const user = await User.find({username: username});
        res.status(200).json(user);
    } catch (error) {
        console.log("Error Hereeee");
        next(error);
    }
    
}
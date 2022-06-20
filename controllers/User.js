import User from "../models/User.js";

export const getUser = async (req, res, next) => {
    const {id} = req.params;
    const user = User.findById(id)
}
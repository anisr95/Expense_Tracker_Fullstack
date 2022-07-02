import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    // authHeader = req.headers['authorization'];
    // authHeader = req.header('authorization');
    // console.log("Req in Protect: ", req.headers.authorization);
    const token = req.headers.authorization;

    // console.log("Auth Header: ", authHeader);
    // const token = authHeader && authHeader.split(' ')[1];
    // console.log("Token:", token);
    if(token == 'null') {
        // console.log('Condition Failed');
        res.sendStatus(400);
    } else{
        // console.log("Condition Passed")
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.sendStatus(403);
            // req.user = user;
        });
    }
    
    
    // res.redirect('/auth/register');
    
    next();
}

export const test = (req, res, next) => {

    console.log("Req from Middleware: ", req);
    // console.log(req.header("x-auth-token"))
    next();
}
const jwt = require('jsonwebtoken');
exports.isAuthenticated = (req, res, next)=>{
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error("The token has expired");
        }
        console.log({token});
        console.log(process.env.JWT_SECRET);
        const {email, name, id} = jwt.verify(token, process.env.JWT_SECRET );
        req.user = {email, name, id};
        next()     
    } catch (error) {
        next(error);
    }
}
const jwt = require('jsonwebtoken');
exports.isAuthenticated = (req, res, next)=>{
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error("Login again to continue");
        }
        const {email, name, id} = jwt.verify(token, process.env.JWT_SECRET );
        req.user = {email, name, id};
        next()     
    } catch (error) {
        return res.status(401).json(error);
    }
}
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //Get Token from Header
    const token = req.header('x-auth-token');

    //Check if no Token
    if(!token) {
        return res.status(401).json({msg: "No Token, Authorization denied"});
    };

    //verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }
    catch(error) {
        res.status(401).json({msg: "Token is not valid"});
    }
};


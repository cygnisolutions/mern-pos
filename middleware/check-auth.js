
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token  = req.headers.authorization.split(' ')[1];

        if (!token){
            const error =  new Error('Authentication failed');
            return next(error);
        }

        const decodedToken = jwt.verify(token, 'VWSRxg0zTYfuGpMX');
        req.userData = {userId: decodedToken.userId};
        next();

    } catch (err) {
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
    }
    
}
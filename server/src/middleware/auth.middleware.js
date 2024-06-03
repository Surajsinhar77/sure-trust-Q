const jwt = require('jsonwebtoken');
const ErrorHandling = require('../utlity/errorResponse');

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};

const secretkey = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, _, next) => {
    try{
        const Authorization = req.headers['authorization'];
        const token = Authorization && Authorization.split(' ')[1] || req.cookies?.accessToken;

        if(token != undefined && token != null){
            if(token) {
                jwt.verify(token, secretkey, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        throw new ErrorHandling('Invalid token', 401);
                    }
                    req.user = decoded;
                    next();
                });
            }else{
                throw new ErrorHandling('Token is not found or null', 404);
            }
        }else{
            throw new ErrorHandling('Token is not found or null', 404);
        }
    }catch(err){
        throw new ErrorHandling(err.message, 404);
    }
};

module.exports = verifyToken;

// put this in signup to check if user is already exist
const jwt = require('jsonwebtoken');
const ErrorHandling = require('../utlity/errorResponse');

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};

const secretkey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    try{
        const Authorization = req.headers['authorization'];
        const token = Authorization && Authorization.split(' ')[1];
        if(token != undefined && token != null){
            if(token) {
                jwt.verify(token, secretkey, (err, decoded) => {
                    if (err) {
                        res.cookie("accessToken" , token, options);
                        throw new ErrorHandling('Invalid token', 401);
                    }
                    req.user = decoded;
                    next();
                });
            }else{
                res.cookie("accessToken" , token, options);
                throw new ErrorHandling('Token is not found or null', 404);
            }
        }else{
            res.cookie("accessToken" , token, options);
            throw new ErrorHandling('Token is not found or null', 404);
        }
    }catch(err){
        res.cookie("accessToken" , token, options);
        throw new ErrorHandling(err.message, 404);
    }
};

module.exports = verifyToken;

// put this in signup to check if user is already exist
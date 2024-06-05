const jwt = require('jsonwebtoken');
const ErrorHandling = require('../utlity/errorResponse');
const { ApiResponse } = require('../utlity/responseHandling');

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};

const secretkey = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    try {
        console.log("verify token")
        const Authorization = req.headers['authorization'];
        const token = Authorization && Authorization.split(' ')[1] || req.cookies?.accessToken;

        if (token != undefined && token != null) {
            jwt.verify(token, secretkey, (err, decoded) => {
                if (err) {
                    console.log(err);
                    throw new ErrorHandling('Invalid token', 401);
                }
                req.user = decoded;
                next();
            });
        } else {
            throw new ErrorHandling('Token is not found or null', 404);
        }
    } catch (err) {
        return res.status(err?.statusCode).json(new ApiResponse(err?.statusCode, {}, err?.message, null));
    }
};

module.exports = verifyToken;

// put this in signup to check if user is already exist
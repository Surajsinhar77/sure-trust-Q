const jwt = require('jsonwebtoken');
const ErrorHandling = require('../utlity/errorResponse');
const { ApiResponse } = require('../utlity/responseHandling');

const secretkey = process.env.ACCESS_TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    try {
        const Authorization = req.headers['authorization'];
        const token = Authorization && Authorization.split(' ')[1] || req.cookies?.accessToken;

        if (token != undefined && token != null) {
            jwt.verify(token, secretkey, (err, decoded) => {
                if (err) {
                    // console.log(err.message);
                    throw new ErrorHandling(401, err?.message || 'Unauthorized',);
                }
                req.user = decoded;
                next();
            });
        } else {
            throw new ErrorHandling(404 , 'Token not found');
        }
    } catch (err) {
        return res.status(err?.statusCode).json(new ApiResponse(err?.statusCode, {}, err?.message));
    }
};

module.exports = verifyToken;
// put this in signup to check if user is already exist
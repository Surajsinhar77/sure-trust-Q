const jwt = require('jsonwebtoken');

const genrateAccessToken = (payload) => {
    return  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
}

const genrateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});
}


module.exports = {
    genrateAccessToken,
    genrateRefreshToken
}
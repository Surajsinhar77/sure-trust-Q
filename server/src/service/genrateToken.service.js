const jwt = require('jsonwebtoken');

const genrateAccessToken = async(payload) => {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
}

const genrateRefreshToken = async(payload) =>{
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});
}


module.exports = {
    genrateAccessToken,
    genrateRefreshToken
}
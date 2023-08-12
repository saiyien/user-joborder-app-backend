const jwt = require('jsonwebtoken');
const config = require('../../config');

const generateJWT = (user) => {
    const payload = {
        user: {
            id: user._id, // You can use the user's MongoDB ID here
        },
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
};

module.exports = { generateJWT };

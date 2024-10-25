const jwt = require('jsonwebtoken');

// verify JWT (implement as per your authentication strategy)
const verifyToken = (token) => {
    const secretKey = 'firacil'; // actual secret key
    return jwt.verify(token, secretKey);
};

module.exports = verifyToken;
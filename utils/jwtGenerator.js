const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(userId) {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
}

module.exports = jwtGenerator;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        // Desctructure token
        const token = req.header('token');
        
        // Check if token exists
        if (!token) {
            return res.status(401).send('Unauthorized')
        }

        // Check if token is valid
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.id = payload.id; // payload.id comes from jwtGenerator.js
    } catch (err) {
        console.error(err.message);
        return res.status(401).send('Unauthorized');
    }

    next();
}
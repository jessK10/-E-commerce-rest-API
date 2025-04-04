const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (without password field)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        // Attach the user object to the request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        let message = 'Invalid token';
        if (error.name === 'TokenExpiredError') message = 'Token expired';
        if (error.name === 'JsonWebTokenError') message = 'Malformed token';

        res.status(401).json({ message });
    }
};

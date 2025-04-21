const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ✅ Only declare this once
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    let message = 'Invalid token';
    if (error.name === 'TokenExpiredError') message = 'Token expired';
    if (error.name === 'JsonWebTokenError') message = 'Malformed token';
    res.status(401).json({ message });
  }
};

module.exports = verifyToken;

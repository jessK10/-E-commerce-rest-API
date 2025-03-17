// middleware.js

// Middleware to calculate a value and pass it to the next function
const calculationMiddleware = (req, res, next) => {
    const result = 4 * 7; // Perform the calculation
    req.calculationResult = result; // Store in request object
    next(); // Move to the next function
};

// Middleware to log the final response
const responseLogger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`Response to User:`, body);
        originalSend.call(this, body);
    };
    next();
};

module.exports = { calculationMiddleware, responseLogger };

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Import JWT middleware

const router = express.Router();

// Protected route: Only accessible with valid JWT
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You have access to this protected route!",
        user: req.user
    });
});

module.exports = router;

const express = require("express");
const { hashPassword } = require("../middleware/passwordEncrypt");
const { signUp, login } = require("../controllers/userControllers");

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
    res.send("ok ok");
});

// User Signup Route
router.post("/signup", signUp);

// User Login Route
router.post("/login", login);

// Fixed: Test Route With Middleware
router.post("/test", hashPassword, (req, res) => {
    const { firstName, email } = req.body;

    if (!firstName || !email) {
        return res.status(400).json({ error: "First Name and Email are required!" });
    }

    res.status(201).json({
        message: "User Created Successfully!",
        user: {
            firstName,
            email,
            hashedPassword: req.hashedPassword,
            _id: "randomId567"
        }
    });
});

module.exports = router;

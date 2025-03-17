const express = require("express");
const router = express.Router();

// ✅ POST request - Create a User
router.post("/", (req, res) => {
    // Destructure `firstName`, `email`, `password` from req.body
    const { firstName, email, password } = req.body;

    // Validate if all fields are provided
    if (!firstName || !email || !password) {
        return res.status(400).json({ error: "First Name, Email, and Password are required!" });
    }

    // ✅ Send JSON response back to the client
    res.status(201).json({
        message: "User Created Successfully!",
        user: {
            firstName,
            email,
            password,
            _id: "randomId123" // Simulating a generated user ID
        }
    });
});

module.exports = router;

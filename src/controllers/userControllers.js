const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// User Signup
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

      
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: savedUser._id,
                email: savedUser.email,
                createdAt: savedUser.createdAt
            }
        });

    } catch (error) {
        // Catch Mongoose validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error signing up user", error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { signUp, login };

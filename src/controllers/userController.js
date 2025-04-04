const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.userSignUp = async (req, res) => {
    const { email, password, username } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Create user (password is automatically hashed in model)
        const newUser = new User({ email, password, username });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Registration failed',
            error: error.message 
        });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const foundUser = await User.findOne({ email }).select("+password");

        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: foundUser._id },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: {
                id: foundUser._id,
                email: foundUser.email,
                username: foundUser.username
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

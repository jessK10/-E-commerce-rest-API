const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Ensure password is not returned by default
    },
    profilePic: {
        type: String, // Stores the image filename
        default: null // Initially, no profile picture
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Add unique validation plugin
userSchema.plugin(uniqueValidator, { 
    message: '{PATH} already exists' 
});

module.exports = mongoose.model('User', userSchema);

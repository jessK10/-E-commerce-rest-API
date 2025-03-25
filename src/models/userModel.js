const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    { timestamps: true } // Adds createdAt & updatedAT fields
);

// Apply the plugin
userSchema.plugin(uniqueValidator, { message: "{PATH} already exists." });


module.exports = mongoose.model("User", UserSchema);

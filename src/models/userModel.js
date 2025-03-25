const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// ✅Apply the plugin AFTER declaring userSchema
userSchema.plugin(uniqueValidator, { message: "[PATH] already exists." });

module.exports = mongoose.model("User", userSchema);

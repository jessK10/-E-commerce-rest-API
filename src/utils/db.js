require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerceDB";

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ No DB connection!", error);
        process.exit(1);
    }
};

module.exports = connectDB;

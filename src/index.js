require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./utils/db"); // Import MongoDB connection

const userRoutes = require("./routes/users"); // Import users route
const productRoutes = require("./routes/products"); // Import products route

const app = express(); //  Moved BEFORE using app.use

const PORT = process.env.PORT || 3000; // Use env variable

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Register Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to my API! E-commerce backend ");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});

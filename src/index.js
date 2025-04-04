require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors"); // Enable CORS
const connectDB = require("./utils/db"); // MongoDB connection

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors()); // Enable Cross-Origin requests
app.use(express.json()); // Parse incoming JSON
app.use("/uploads", express.static("uploads")); // Serve static files

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to my API! E-commerce backend");
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoices"); // ✅ Add this

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes); // ✅ Mount invoice routes

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to my API! E-commerce backend");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

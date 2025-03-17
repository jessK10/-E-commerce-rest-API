const express = require("express");
const userRoutes = require("./routes/users");  // ✅ Import users route

const app = express();
const PORT = 3000;

app.use(express.json());  // ✅ Middleware to parse JSON

// ✅ Register Routes
app.use("/api/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to my API! E-commerce backend 🚀");
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

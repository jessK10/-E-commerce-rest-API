const express = require("express");
const { calculationMiddleware, responseLogger } = require("./middleware");

const app = express();
const PORT = 3000;

// Use Middleware
app.use(express.json()); 
app.use(responseLogger); // Logs responses

// Route using calculation middleware
app.get("/calculate", calculationMiddleware, (req, res) => {
    res.json({ message: "Calculation Complete!", result: req.calculationResult });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

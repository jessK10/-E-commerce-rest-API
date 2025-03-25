// src/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel"); // ⬅️ Import the model

// Test route
router.get("/", (req, res) => {
    res.send("Products Page");
});

// POST: Create a new product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // Includes createdAt & updatedAt
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Sort newest first
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById, // ✅ import the new controller
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

// Routes
router.post("/", verifyToken, createProduct); // Protected
router.get("/", getAllProducts);              // Public
router.get("/:id", getProductById);           // ✅ Get product by ID

module.exports = router;

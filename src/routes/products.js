const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware"); 


router.post("/", verifyToken, createProduct); // Protected
router.get("/", getAllProducts); // Public

module.exports = router;

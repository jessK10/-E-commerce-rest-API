const express = require("express");
const router = express.Router();
const { createInvoice, getUserInvoices } = require("../controllers/invoiceController");
const verifyToken = require("../middleware/authMiddleware");


router.post("/", verifyToken, createInvoice);
router.get("/", verifyToken, getUserInvoices);

module.exports = router;

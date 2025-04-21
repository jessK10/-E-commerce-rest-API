const Invoice = require("../models/invoiceModel");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice({
      ...req.body,
      userId: req.user._id, // From verifyToken
    });
    const saved = await newInvoice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Invoices by User
const getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id }).populate("products.productId");
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createInvoice, getUserInvoices };

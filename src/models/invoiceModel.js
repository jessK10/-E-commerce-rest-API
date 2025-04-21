const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);

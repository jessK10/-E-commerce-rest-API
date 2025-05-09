const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, default: 'apple' },
    stock: { type: Number, default: 1 },

    // ✅ Add this line
    image: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

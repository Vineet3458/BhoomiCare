const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String },
  weight: { type: String },
  brand: { type: String },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

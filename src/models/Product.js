const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    min: 0,
    default: null,
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  images: [{
    url: String,
    public_id: String,
  }],
  stock: {
    type: Number,
    min: 0,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
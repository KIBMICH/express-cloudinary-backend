const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
    default: null,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  truckBrand: {
    type: String,
    required: [true, 'Truck brand is required'],
    trim: true,
  },
  productNeeded: {
    type: String,
    required: [true, 'Product needed is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  deliveryPreference: {
    type: String,
    required: [true, 'Delivery preference is required'],
    enum: ['pickup', 'delivery', 'express'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);

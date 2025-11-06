const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  // Public Info
  brand: {
    type: String,
    required: [true, 'Car brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Car model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1990,
    max: new Date().getFullYear() + 1
  },
  thumbnail: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  }],
  basicDescription: {
    type: String,
    trim: true,
    maxlength: 200
  },

  // Private Information (visible only to logged-in customers)
  price: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: 0
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required'],
    min: 0
  },
  detailedDescription: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'needs_work'],
    default: 'good'
  },
  transmission: {
    type: String,
    enum: ['automatic', 'manual', 'cvt'],
    default: 'automatic'
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    default: 'petrol'
  },
  color: {
    type: String,
    trim: true
  },
  engineSize: {
    type: String,
    trim: true
  },

  // Admin-Only Information (never shown to customers)
  buyingCost: {
    type: Number,
    required: [true, 'Buying cost is required'],
    min: 0
  },
  maintenanceCosts: {
    type: Number,
    default: 0,
    min: 0

  },
  partsCosts: {
    type:Number,
    default: 0,
    min: 0
  },
  otherCosts: {
    type: Number,
    default: 0,
    min: 0
  },
  adminNotes: {
    type: String,
    trim: true
  },

  // Status and data
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  listedDate: {
    type: Date,
    default: Date.now
  },
  soldDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for total costs
carSchema.virtual('totalCosts').get(function () {
  const maintenance = Number(this.maintenanceCosts) || 0;
  const parts = Number(this.partsCosts) || 0;
  const other = Number(this.otherCosts) || 0;
  const buying = Number(this.buyingCost) || 0;

  return buying + maintenance + parts + other;
});

// Virtual for profit margin
carSchema.virtual('profitMargin').get(function () {
  return this.price - this.totalCosts;
});

// Update updatedAt on save
carSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

//virtuals to be  included in JSON
carSchema.set('toJSON', { virtuals: true });
carSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Car', carSchema);

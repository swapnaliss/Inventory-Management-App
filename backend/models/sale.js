const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  itemSold: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalRevenue: {
    type: Number,
  },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;

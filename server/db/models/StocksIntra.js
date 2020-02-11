const mongoose = require('mongoose');

const StockIntraSchema = new mongoose.Schema({
  symbol: String,
  prices: [],
  timestamp: String
});

const Stock = mongoose.model('StockIntra', StockIntraSchema);

module.exports = Stock;

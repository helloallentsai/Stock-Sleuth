const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: String,
  prices: []
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;

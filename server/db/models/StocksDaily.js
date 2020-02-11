const mongoose = require('mongoose');

const StockDailySchema = new mongoose.Schema({
  symbol: String,
  prices: [],
  timestamp: String
});

const StockDaily = mongoose.model('StockDaily', StockDailySchema);

module.exports = StockDaily;

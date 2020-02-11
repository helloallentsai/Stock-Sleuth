const mongoose = require('mongoose');

const db = mongoose.connection;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose
  .connect('mongodb://localhost/stocksleuth', options)
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

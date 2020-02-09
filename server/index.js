require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const app = express();
const morgan = require('morgan');
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3555;

app.get('/stocks/:stock', (req, res) => {
  const stock = req.params.stock;
  const bank = {};

  const populate = stock => {
    const result = [];
    const entries = stock['Time Series (5min)'];
    for (let time in entries) {
      const entry = {
        time,
        open: entries[time]['1. open'],
        high: entries[time]['2. high'],
        low: entries[time]['3. low'],
        close: entries[time]['4. close'],
        volume: entries[time]['5. volume']
      };
      result.push(entry);
    }
    return result;
  };

  if (!bank[stock]) {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${process.env.API_KEY}`
      )
      .then(res => {
        const stock = res.data['Meta Data']['2. Symbol'];
        const prices = populate(res.data);

        bank[stock] = {
          symbol: stock,
          prices
        };
        const result = bank[stock];
        return result;
      })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  }
});

app.get('/stocks/daily/:stock', (req, res) => {
  const stock = req.params.stock;
  const bank = {};
  const populate = stock => {
    const result = [];
    const entries = stock['Time Series (Daily)'];
    for (let day in entries) {
      const entry = {
        day,
        open: entries[day]['1. open'],
        high: entries[day]['2. high'],
        low: entries[day]['3. low'],
        close: entries[day]['4. close'],
        volume: entries[day]['5. volume']
      };
      result.push(entry);
    }
    return result;
  };

  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.API_KEY}`
    )
    .then(res => {
      const stock = res.data['Meta Data']['2. Symbol'];
      const prices = populate(res.data);

      bank[stock] = {
        symbol: stock,
        prices
      };

      const result = bank[stock];
      return result;
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

app.listen(port, () => console.log(`server running on port ${port}`));

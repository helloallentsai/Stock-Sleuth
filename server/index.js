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
        console.log(bank);
        console.log(bank[stock]);
        const result = bank[stock];
        return result;
      })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  } else {
    console.log('cached');
  }

  console.log(bank);
  console.log(bank[stock]);
  // res.end();
});

app.listen(port, () => console.log(`server running on port ${port}`));

/*
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=demo
*/

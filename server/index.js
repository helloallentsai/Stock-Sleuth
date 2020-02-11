require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const db = require('./db/index.js');
const StocksIntra = require('./db/models/StocksIntra');
const StocksDaily = require('./db/models/StocksDaily');
const moment = require('moment');

app.use(morgan('dev'));
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3555;

app.get('/stocks/intra/:stock', (req, res) => {
  const stock = req.params.stock;

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

  StocksIntra.findOne({ symbol: stock }).then(dbres => {
    if (!dbres) {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${process.env.API_KEY_INTRA}`
        )
        .then(apiRes => {
          const stock = apiRes.data['Meta Data']['2. Symbol'];
          const prices = populate(apiRes.data);

          const entry = {
            symbol: stock,
            prices,
            timestamp: moment()
          };

          StocksIntra.create(entry).then(data => {
            res.status(200).send(data);
          });
        })
        .catch(err => res.status(400).send(err));
    } else {
      console.log('cached intra');
      console.log(dbres.timestamp);
      const previous = moment(dbres.timestamp);
      const now = moment();
      const diff = now.diff(previous, 'minutes');
      console.log(diff);

      if (diff > 5) {
        console.log('update');
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${process.env.API_KEY_INTRA}`
          )
          .then(apiRes => {
            const stock = apiRes.data['Meta Data']['2. Symbol'];
            const prices = populate(apiRes.data);

            const update = {
              prices,
              timestamp: moment()
            };

            StocksIntra.findOneAndUpdate({ symbol: stock }, update).then(
              data => {
                res.status(200).send(data);
              }
            );
          })
          .catch(err => res.status(400).send(err));
      } else {
        res.status(200).send(dbres);
      }
    }
  });
});

app.get('/stocks/daily/:stock', (req, res) => {
  const stock = req.params.stock;

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

  StocksDaily.findOne({ symbol: stock }).then(dbres => {
    if (!dbres) {
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.API_KEY_DAILY}`
        )
        .then(apiRes => {
          const stock = apiRes.data['Meta Data']['2. Symbol'];
          const prices = populate(apiRes.data);

          const entry = {
            symbol: stock,
            prices,
            timestamp: moment()
          };

          StocksDaily.create(entry).then(data => {
            res.status(200).send(data);
          });
        })
        .catch(err => res.status(400).send(err));
    } else {
      console.log('cached daily');
      console.log(dbres.timestamp);
      const previous = moment(dbres.timestamp);
      const now = moment();
      const diff = now.diff(previous, 'days');
      console.log(diff);

      if (diff > 0) {
        console.log('update');
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.API_KEY_DAILY}`
          )
          .then(apiRes => {
            const stock = apiRes.data['Meta Data']['2. Symbol'];
            const prices = populate(apiRes.data);

            const update = {
              prices,
              timestamp: moment()
            };

            StocksDaily.findOneAndUpdate({ symbol: stock }, update).then(
              data => {
                res.status(200).send(data);
              }
            );
          })
          .catch(err => res.status(400).send(err));
      } else {
        res.status(200).send(dbres);
      }
    }
  });
});

app.listen(port, () => console.log(`server running on port ${port}`));

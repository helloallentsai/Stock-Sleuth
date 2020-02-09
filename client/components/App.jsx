import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import Chart from './Chart';
import Stocks from './Stocks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [stocksDaily, setStocksDaily] = useState([]);
  const [stock, setStock] = useState('AAPL');
  const [chartIdx, setChartIdx] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    stock &&
      axios
        .get(`/stocks/${stock}`)
        .then(res => {
          const stock = res.data;
          setStocks([...stocks, stock]);
          setError(false);
        })
        .catch(err => setError(true))
        .then(_ => {
          return axios.get(`/stocks/daily/${stock}`);
        })
        .then(res => {
          const stockDaily = res.data;
          setStocksDaily([...stocksDaily, stockDaily]);
        });
  }, [stock]);

  return (
    <div>
      <div id="header">
        <h1>
          <span>Stock</span>
          <span id="sleuth">Sleuth</span>
          <FontAwesomeIcon icon={faSearchDollar} id="fa-icon" />
        </h1>
      </div>
      <Form setStock={setStock} />
      {error && <div id="error">ERROR: invalid stock symbol</div>}
      <Stocks stocks={stocks} setChartIdx={setChartIdx} />
      {stocks.length > 0 && (
        <Chart stock={stocks[chartIdx]} stocksDaily={stocksDaily[chartIdx]} />
      )}
    </div>
  );
};

export default App;

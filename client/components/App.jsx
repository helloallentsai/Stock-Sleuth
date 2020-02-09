import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import Chart from './Chart';
import Stocks from './Stocks';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState('AAPL');
  const [chartIdx, setChartIdx] = useState(0);

  useEffect(() => {
    stock &&
      axios
        .get(`/stocks/${stock}`)
        .then(res => {
          const stock = res.data;
          setStocks([...stocks, stock]);
        })
        .catch(err => console.log(err));
  }, [stock]);

  return (
    <div>
      <div id="header">
        <h1>Stock Sleuth</h1>
      </div>
      <Form setStock={setStock} />
      <Stocks stocks={stocks} setChartIdx={setChartIdx} />
      {stocks.length > 0 && <Chart stock={stocks[chartIdx]} />}
    </div>
  );
};

export default App;

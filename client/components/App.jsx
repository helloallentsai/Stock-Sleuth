import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

const App = () => {
  // const [data, setData] = useState(null);
  const [stock, setStock] = useState('MSFT');
  const [prices, setPrices] = useState([]);

  //what's the best way to cache?
  useEffect(() => {
    axios.get(`/stocks/${stock}`).then(res => setPrices(res.data.prices));
  }, [stock]);

  // useEffect(() => {
  //   if (data !== null) {
  //     setPrices(populate(data));
  //   }
  // }, [data]);

  const handleSubmit = e => {
    e.preventDefault();
    setStock(input);
  };

  const [input, setInput] = useState('');

  return (
    <div>
      <div>Stock Sleuth</div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setInput(e.target.value)}></input>
        <button>submit</button>
      </form>
      {stock && (
        <div>
          <div>{stock}</div>
          <div>time - open - high - low - close - volume</div>
        </div>
      )}
      {prices.map((entry, idx) => (
        <div key={idx}>
          <Moment parse="YYYY-MM-DD HH:mm" format="MMM D h:mm a">
            {entry.time}
          </Moment>
          <div>
            {entry.open} {entry.high} {entry.low} {entry.close} {entry.volume}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

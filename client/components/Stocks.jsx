import React from 'react';
import Stock from './Stock';

const Stocks = ({ stocks }) => {
  return (
    <div>
      <h3>All stocks will render here</h3>
      <div id="stocks">
        {stocks.map((stock, idx) => (
          <Stock stock={stock} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Stocks;

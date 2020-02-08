import React from 'react';
import Moment from 'react-moment';

const Stock = ({ stock }) => {
  const { symbol } = stock;
  const prices = stock.prices.map((entry, idx) => (
    <div key={idx}>
      <Moment parse="YYYY-MM-DD HH:mm" format="MMM D h:mm a">
        {entry.time}
      </Moment>
      <div>
        {entry.open} {entry.high} {entry.low} {entry.close} {entry.volume}
      </div>
    </div>
  ));

  return (
    <div className="stock">
      <div onClick={() => {}}>{symbol}</div>
      <div>{prices}</div>
    </div>
  );
};

export default Stock;

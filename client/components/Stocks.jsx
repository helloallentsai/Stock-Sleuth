import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Stocks = ({ stocks, setChartIdx }) => {
  stocks = stocks.map((stock, idx) => {
    const { symbol } = stock;
    const currentPrice = (
      Math.round(stock.prices[0].close * 100) / 100
    ).toFixed(2);

    let arrow;
    if (currentPrice > stock.prices[1].close) {
      arrow = <FontAwesomeIcon icon={faArrowUp} color="#64EF23" size="sm" />;
    } else {
      arrow = <FontAwesomeIcon icon={faArrowDown} color="red" size="sm" />;
    }
    return (
      <div
        className="stock"
        key={idx}
        onClick={() => {
          setChartIdx(idx);
        }}
      >
        <div className="symbol">{symbol}</div>
        <div className="current-price">
          ${currentPrice} {arrow}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div id="stocks">{stocks}</div>
    </div>
  );
};

export default Stocks;

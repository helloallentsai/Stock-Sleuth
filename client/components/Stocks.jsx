import React from 'react';

const Stocks = ({ stocks, setChartIdx }) => {
  console.log(stocks);

  stocks = stocks.map((stock, idx) => {
    const { symbol } = stock;
    const currentPrice = (
      Math.round(stock.prices[0].close * 100) / 100
    ).toFixed(2);

    return (
      <div
        className="stock"
        key={idx}
        onClick={() => {
          setChartIdx(idx);
        }}
      >
        <div className="symbol">{symbol}</div>
        <div className="current-price">{currentPrice}</div>
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

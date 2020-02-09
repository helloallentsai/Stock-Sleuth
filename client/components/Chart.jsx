import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = props => {
  const [renderView, setRenderView] = useState('day');
  const { prices, symbol } = props.stock;

  const prepChart = (prices, symbol, view) => {
    const timestamps = [];
    const closingPrices = [];
    for (let entry of prices) {
      if (view === 'month') {
        timestamps.push(entry.day);
      } else if (view === 'day') {
        timestamps.push(entry.time);
      }
      closingPrices.push(entry.close);
    }

    const data = {
      labels: timestamps,
      datasets: [
        {
          label: `${symbol} prices`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(100, 239, 35,0.4)',
          borderColor: '#64EF23',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#3BB104',
          pointBackgroundColor: '#8D99AE',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#3BB104',
          pointHoverBorderColor: '#8D99AE',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: closingPrices
        }
      ]
    };

    const options = {
      responsive: true,
      legend: {
        labels: {
          fontColor: '#8D99AE'
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#8D99AE'
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: '#8D99AE'
            },
            type: 'time',
            time: {
              displayFormats: {
                hour: 'MMM D h A'
              }
            }
          }
        ]
      }
    };
    if (view === 'month') {
      options.scales.xAxes[0].time = { unit: 'month' };
    }

    return [data, options];
  };

  const [data, options] = prepChart(prices, symbol, 'day');

  let pricesDaily;
  let dataDay, optionsDay;
  if (props.stocksDaily) {
    pricesDaily = props.stocksDaily.prices;
    [dataDay, optionsDay] = prepChart(pricesDaily, symbol, 'month');
  }

  return (
    <div id="chart">
      {renderView === 'day' && (
        <Line data={data} width={300} height={100} options={options} />
      )}

      {renderView === 'month' && (
        <Line data={dataDay} width={300} height={100} options={optionsDay} />
      )}
      <button
        className="chart-button"
        onClick={() => {
          setRenderView('day');
        }}
      >
        day view
      </button>
      <button
        className="chart-button"
        onClick={() => {
          setRenderView('month');
        }}
      >
        month view
      </button>
    </div>
  );
};

export default Chart;

import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = props => {
  const { prices, symbol } = props.stock;
  const timestamps = [];
  const closingPrices = [];
  for (let entry of prices) {
    timestamps.push(entry.time);
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
        pointBackgroundColor: '#EDF2F4',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#3BB104',
        pointHoverBorderColor: '#EDF2F4',
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

  return (
    <div>
      <Line data={data} width={300} height={100} options={options} />
    </div>
  );
};

export default Chart;

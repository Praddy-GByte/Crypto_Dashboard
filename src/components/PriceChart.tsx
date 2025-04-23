import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MarketChartData } from '../services/cryptoService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  data: MarketChartData;
  currency: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, currency }) => {
  const chartData = {
    labels: data.prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: data.prices.map((price) => price[1]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return `${currency.toUpperCase()} ${value}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}; 
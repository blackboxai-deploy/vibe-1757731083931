import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const HealthChart = ({ member }) => {
  if (!member) return null;

  const data = {
    labels: ['Peso', 'Presión', 'Glucosa', 'Colesterol'],
    datasets: [
      {
        label: 'Valores Actuales',
        data: [member.salud.peso, member.salud.presion, member.salud.glucosa, member.salud.colesterol],
        fill: true,
        backgroundColor: 'rgba(13,110,253,0.2)',
        borderColor: '#0d6efd',
        pointBackgroundColor: '#0d6efd',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0d6efd'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: { color: 'rgba(0,0,0,0.1)' },
        grid: { color: 'rgba(0,0,0,0.1)' },
        pointLabels: { font: { size: 11 } }
      }
    },
    plugins: {
      legend: { labels: { font: { size: 12 } } }
    }
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default HealthChart;
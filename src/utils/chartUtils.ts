import { Chart } from 'chart.js';

const labelsForDay = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

const labelsForMonth = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

// 임의값
const valuesByDay = Array.from(
  { length: 31 },
  () => Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
);

const valuesByMonth = [
  0, 92432, 87744, 78233, 93210, 89462, 70825, 97642, 76688, 84211, 81292,
  90978,
];

export const chartPlugins = [
  {
    id: 'customLineDrawPlugin',
    afterDraw: (chart: Chart) => {
      const tooltipItems = chart.getDatasetMeta(0).data;
      const activePoint = tooltipItems.find((item) => item.active);

      if (activePoint) {
        let x = activePoint.x;
        let yAxis = chart.scales.y;
        let ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FF3E9A';
        ctx.stroke();
        ctx.restore();
      }
    },
  },
];

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: 'index' as const,
    axis: 'x' as const,
    intersect: false,
  },

  plugins: {
    tooltip: {
      mode: 'index' as const,
      callbacks: {
        labelColor: () => ({
          borderColor: 'transparent',
          backgroundColor: '#FF3E9A',
        }),
      },
    },

    legend: {
      display: false,
    },

    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const dataByDay = {
  labels: labelsForDay,
  datasets: [
    {
      fill: true,
      label: '수입',
      data: valuesByDay,
      borderColor: '#8338EC',
      backgroundColor: 'rgba(131, 56, 236, 0.1)',
      pointBackgroundColor: '#8338EC',

      pointRadius: 0,
      pointHoverRadius: 5,
    },
  ],
};

export const dataByMonth = {
  labels: labelsForMonth,
  datasets: [
    {
      label: '수입',
      data: valuesByMonth,
      backgroundColor: '#8338EC',
      hoverBackgroundColor: '#FF3E9A',
    },
  ],
};

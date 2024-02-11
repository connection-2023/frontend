import { Chart } from 'chart.js';

interface IStatResponse {
  date: string;
  totalSales: number;
  totalPrice: number;
}

export const getMonthlyData = (data: IStatResponse[]) => {
  const labels = data
    .map((item) => new Date(item.date).getMonth() + 1 + '월')
    .reverse();
  const dataSets = data.map((item) => item.totalPrice).reverse();

  return {
    labels: labels,
    datasets: [
      {
        label: '수입',
        data: dataSets,
        backgroundColor: '#8338EC',
        hoverBackgroundColor: '#FF3E9A',
      },
    ],
  };
};

export const getDailyData = (data: IStatResponse[]) => {
  const labels = data
    .map((item) => new Date(item.date).getDate() + '일')
    .reverse();
  const dataSets = data.map((item) => item.totalPrice).reverse();

  return {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: '수입',
        data: dataSets,
        borderColor: '#8338EC',
        backgroundColor: 'rgba(131, 56, 236, 0.1)',
        pointBackgroundColor: '#8338EC',
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };
};

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

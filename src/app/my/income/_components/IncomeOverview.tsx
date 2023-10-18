import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { MoneySVG } from '@/icons/svg';
import {
  options,
  dataByMonth,
  dataByDay,
  chartPlugins,
} from '@/utils/chartUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const IncomeOverview = ({
  view,
  handleApply,
}: {
  view: 'main' | 'payment';
  handleApply: () => void;
}) => {
  const [chartView, setChartView] = useState('month');
  return (
    <section className="shadow-float w-full max-w-[40rem] rounded-[0.31rem]">
      <div className="flex h-12 items-center justify-between border-b border-solid border-sub-color4 p-4">
        <div className="flex gap-[1.69rem] text-sm font-semibold text-sub-color3">
          <p>
            총
            <span className="ml-[0.37rem] text-lg font-bold text-black">
              1,230,800원
            </span>
          </p>
          <p>
            이번달
            <span className="ml-[0.37rem] text-lg font-bold text-sub-color1">
              1,230,800원
            </span>
          </p>
        </div>

        {view === 'main' && (
          <button
            onClick={handleApply}
            className="flex h-7 w-24 items-center justify-center rounded-[0.31rem] bg-main-color text-sm font-semibold text-white"
          >
            <MoneySVG width="18" height="18" fill="white" stroke="white" />
            정산신청
          </button>
        )}
      </div>
      {view === 'main' && (
        <div className="border-box mb-4 h-48 w-full px-9 py-4">
          <div className="mb-2 flex gap-3 text-sm text-sub-color2">
            <button
              onClick={() => setChartView('month')}
              className={`${chartView === 'month' ? 'text-black' : ''}`}
            >
              월별
            </button>
            <button
              onClick={() => setChartView('day')}
              className={`${chartView === 'month' ? '' : 'text-black'}`}
            >
              일별
            </button>
          </div>
          {chartView === 'month' ? (
            <Bar options={options} data={dataByMonth} />
          ) : (
            <Line options={options} data={dataByDay} plugins={chartPlugins} />
          )}
        </div>
      )}
    </section>
  );
};

export default IncomeOverview;

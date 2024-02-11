import { useQuery } from '@tanstack/react-query';
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
import { ArrowUpSVG } from '@/icons/svg';
import { getIncomeStatics } from '@/lib/apis/incomeApis';
import AccountInfo from './AccountInfo';
import PaymentRange from './PaymentRange';
import {
  getMonthlyData,
  getDailyData,
  options,
  chartPlugins,
} from '../_lib/chartUtils';

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

interface IncomeOverviewProps {
  view: 'main' | 'payment';
  handlePrev: () => void;
  handleApply: () => void;
}

const IncomeOverview = ({
  view,
  handlePrev,
  handleApply,
}: IncomeOverviewProps) => {
  const [chartView, setChartView] = useState<'MONTHLY' | 'DAILY'>('MONTHLY');
  const { data, isLoading, error } = useQuery({
    queryKey: ['stat', chartView],
    queryFn: () => getIncomeStatics(chartView),
  });

  if (!data || data instanceof Error) return null;

  const chartData =
    chartView === 'MONTHLY' ? getMonthlyData(data) : getDailyData(data);

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
      <section className="w-full overflow-hidden rounded-lg shadow-float">
        <h1
          className={`flex items-center overflow-hidden bg-white px-1 py-3 text-2xl font-bold text-gray-100 ${
            view === 'main' && 'mb-1 px-4'
          }`}
        >
          {view === 'payment' && (
            <button onClick={handlePrev} className="origin-center -rotate-90">
              <ArrowUpSVG width="34" height="34" fill="black" />
            </button>
          )}
          수익관리
        </h1>

        {view === 'main' ? (
          <div className="border-box flex h-full w-full flex-col rounded-b-md bg-white px-9 pt-4">
            <div className="mb-2 flex gap-3 text-sm text-gray-500">
              <button
                onClick={() => setChartView('MONTHLY')}
                className={`${chartView === 'MONTHLY' ? 'text-black' : ''}`}
              >
                월별
              </button>
              <button
                onClick={() => setChartView('DAILY')}
                className={`${chartView === 'MONTHLY' ? '' : 'text-black'}`}
              >
                일별
              </button>
            </div>
            {chartView === 'MONTHLY' ? (
              <div>
                <Bar options={options} data={chartData} />
              </div>
            ) : (
              <div>
                <Line
                  options={options}
                  data={chartData}
                  plugins={chartPlugins}
                />
              </div>
            )}
          </div>
        ) : (
          <section className="rounded-b-lg bg-white pt-5">
            <ul className="mb-3 flex w-full gap-6 whitespace-nowrap border-b border-solid border-gray-500 px-4 pb-4 text-sm text-gray-100">
              <li className="flex items-center">
                <p className="w-10 font-semibold">총 수익</p>
                <span className="ml-[0.69rem] text-lg font-bold text-black">
                  1,230,800원
                </span>
              </li>
              <li className="flex items-center ">
                <p className="w-10 font-semibold">이번 달</p>
                <span className="ml-[0.69rem] text-lg font-bold text-sub-color1">
                  1,230,800원
                </span>
              </li>
            </ul>
            <div className="flex flex-col px-4">
              <h1 className="mb-3 mt-1 flex text-base font-semibold">
                정산 기간 설정
              </h1>
              <PaymentRange />
            </div>
          </section>
        )}
      </section>
      <AccountInfo view={view} handleApply={handleApply} />
    </div>
  );
};

export default IncomeOverview;

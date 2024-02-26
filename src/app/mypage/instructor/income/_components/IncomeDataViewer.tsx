import { useQueries } from '@tanstack/react-query';
import { useState, useEffect, ChangeEvent } from 'react';
import { MYPAGE_FILTER_OPTIONS } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/classApi';
import { getTotalIncome, getIncomeHistory } from '@/lib/apis/incomeApis';
import IncomeRange from './IncomeRange';
import IncomeTable from './IncomeTable';
import IncomeDataViewerLoading from './Loading/IncomeDataViewerLoading';
import { initialDateObject } from '../_lib/initialDate';
import Pagination from '@/components/Pagination/Pagination';

interface OptionType {
  value: number | string;
  label: string;
}

interface ILecture {
  id: number;
  title: string;
}

const IncomeDataViewer = () => {
  const [selectedOption, setSelectedOption] = useState(
    MYPAGE_FILTER_OPTIONS.All,
  );
  const [range, setRange] = useState<{ from: Date; to: Date }>(
    initialDateObject,
  );
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [displayCount, setDisplayCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsId, setItemsId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });

  const [
    { data: classList },
    { data: totalAmount },
    { data: incomeHistory, isLoading: historyLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['myClass'],
        queryFn: () => getMyLecture(),
      },
      {
        queryKey: ['income', 'amount', range.to, range.from, selectedOption],
        queryFn: () => getTotalIncome(range.from, range.to, selectedOption),
      },
      {
        queryKey: [
          'income',
          range.to,
          range.from,
          selectedOption,
          displayCount,
          selectedClass,
        ],
        queryFn: () =>
          getIncomeHistory(
            range,
            selectedOption,
            displayCount,
            itemsId,
            selectedClass,
          ),
      },
    ],
  });

  useEffect(() => {
    if (incomeHistory && incomeHistory.length > 0) {
      setItemsId({
        firstItemId: incomeHistory[0].id,
        lastItemId: incomeHistory[incomeHistory.length - 1].id,
      });
    }
  }, [incomeHistory]);

  if (!incomeHistory || historyLoading) return <IncomeDataViewerLoading />;

  const { totalItemCount, lecturerPaymentList } = incomeHistory;
  const pageCount = Math.floor(totalItemCount / displayCount);

  const myClassList: OptionType[] = classList?.data.lecture.map(
    ({ id, title }: ILecture) => ({
      value: id,
      label: title,
    }),
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleDisplayCount = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDisplayCount = Number(event.target.value);
    setDisplayCount(newDisplayCount);
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSetRange = (newRange: { from: Date; to: Date }) => {
    setRange(newRange);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.id as MYPAGE_FILTER_OPTIONS;

    if (Object.values(MYPAGE_FILTER_OPTIONS).includes(option)) {
      setSelectedOption(option);
    }
  };

  return (
    <section className="w-full rounded-lg bg-white shadow-float lg:col-span-2">
      <div className="flex flex-col gap-2.5 whitespace-nowrap border-b border-solid border-gray-700 px-4 py-5">
        {/* 조회 기간 선택 */}
        <IncomeRange handleSetRange={handleSetRange} />

        {/* 전체, 클래스, 패스권 필터링 */}
        <div className="flex gap-4 text-sm">
          <ul className="flex gap-4 font-medium">
            {Object.values(MYPAGE_FILTER_OPTIONS).map((option) => (
              <li key={option} className="flex items-center gap-[0.31rem]">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOption === option}
                  onChange={handleCheckboxChange}
                  className="h-[18px] w-[18px] accent-sub-color1"
                />
                <label htmlFor={option}> {option}</label>
              </li>
            ))}
          </ul>

          {/* 특정 클래스 선택하기 */}
          <select
            id="class"
            value={selectedClass || ''}
            onChange={handleChange}
            className="h-7 w-full max-w-[24rem] rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1"
            aria-label="특정 클래스 선택하기"
          >
            <option value="" disabled className="text-gray-500">
              클래스를 선택해주세요
            </option>
            {myClassList?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full px-4">
        <IncomeTable
          data={lecturerPaymentList}
          selectedOption={selectedOption}
          displayCount={displayCount}
          handleDisplayCount={handleDisplayCount}
        >
          <div className="flex gap-5 text-gray-100">
            <p>총 {totalItemCount}건</p>
            <p>
              총 금액
              <span className="ml-1 font-bold">
                {totalAmount?.toLocaleString()}원
              </span>
            </p>
          </div>
        </IncomeTable>
      </div>

      {pageCount > 1 && (
        <div className="mb-5 w-full">
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default IncomeDataViewer;

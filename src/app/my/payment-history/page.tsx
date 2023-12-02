'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPaymentHistory } from '@/lib/apis/paymentApis';
import PaymentList from './_components/PaymentList';
import Pagination from '@/components/Pagination/Pagination';
import { IMyPayment } from '@/types/types';

enum filterOptions {
  All = '전체',
  Class = '클래스',
  Pass = '패스권',
}

const PaymentHistory = () => {
  const [selectedOption, setSelectedOption] = useState(filterOptions.All);
  const [displayCount, setDisplayCount] = useState(5);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [paymentData, setPaymentData] = useState<IMyPayment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemId, setItemId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });
  const pageCount = Math.round(totalItemCount / displayCount);

  useEffect(() => {
    loadPaymentHistory(
      displayCount,
      currentPage,
      currentPage,
      itemId.firstItemId,
      itemId.lastItemId,
      selectedOption,
    );
  }, []);

  const loadPaymentHistory = async (
    displayCount: number,
    currentPage: number,
    targetPage: number,
    firstItemId: number,
    lastItemId: number,
    option: string,
  ) => {
    const data = await getPaymentHistory(
      displayCount,
      currentPage,
      targetPage,
      firstItemId,
      lastItemId,
      option,
    );

    if (data instanceof Error) return;

    const { totalItemCount, paymentHistory } = data;
    setTotalItemCount(totalItemCount);
    setPaymentData(paymentHistory);

    const itemIds = {
      firstItemId: paymentHistory[0].id,
      lastItemId: paymentHistory[displayCount - 1].id,
    };

    setItemId(itemIds);
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const option = event.target.id as filterOptions;

    if (Object.values(filterOptions).includes(option)) {
      setSelectedOption(option);

      await loadPaymentHistory(
        displayCount,
        currentPage,
        currentPage,
        itemId.firstItemId,
        itemId.lastItemId,
        option,
      );
    }
  };

  const handleDisplayCount = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = Number(event.target.value);
    setDisplayCount(newValue);

    await loadPaymentHistory(
      newValue,
      currentPage,
      currentPage,
      itemId.firstItemId,
      itemId.lastItemId,
      selectedOption,
    );
  };

  const handlePaymentDelete = () => {
    const userConfirmed = window.confirm(
      '삭제내역은 복구할 수 없습니다. 정말로 삭제하겠습니까?',
    );
    if (userConfirmed) {
      // API 처리
      toast.success('결제내역이 삭제되었습니다!');
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);

    await loadPaymentHistory(
      displayCount,
      currentPage,
      selected,
      itemId.firstItemId,
      itemId.lastItemId,
      selectedOption,
    );
  };

  return (
    <section className="col-span-2 mt-7 w-full max-w-[40rem]">
      <h1 className="mb-2.5 border-b border-solid border-gray-700 pb-2.5 text-2xl font-bold text-gray-100">
        결제내역
      </h1>
      <div className="mb-4 flex justify-between gap-4 text-sm">
        <ul className="flex gap-4 font-medium">
          {Object.values(filterOptions).map((option) => (
            <li key={option} className="flex items-center gap-[0.31rem]">
              <input
                type="checkbox"
                id={option}
                checked={selectedOption === option}
                onChange={handleCheckboxChange}
                className="h-[18px] w-[18px] cursor-pointer accent-sub-color1"
              />
              <label htmlFor={option} className="cursor-pointer">
                {option}
              </label>
            </li>
          ))}
        </ul>

        <select
          value={displayCount}
          onChange={handleDisplayCount}
          className="h-7 w-[5.75rem] border border-solid border-gray-500"
        >
          {[5, 10, 15, 20].map((displayCount) => (
            <option key={displayCount} value={displayCount}>
              {displayCount}개
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {paymentData.map((data) => (
          <PaymentList
            key={data.id}
            {...data}
            handlePaymentDelete={handlePaymentDelete}
          />
        ))}
      </div>

      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default PaymentHistory;

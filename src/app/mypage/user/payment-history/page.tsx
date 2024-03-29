'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { MYPAGE_FILTER_OPTIONS } from '@/constants/constants';
import { getPaymentHistory } from '@/lib/apis/paymentApis';
import EmptyData from './_components/EmptyData';
import Pagination from '@/components/Pagination/Pagination';
import PageSizeSelector from '@/components/Selector/PageSizeSelector';
import Spinner from '@/components/Spinner/Spinner';

const PaymentList = dynamic(() => import('./_components/PaymentList'), {
  ssr: false,
});

const PaymentHistory = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const option = searchParams.get('option') || '전체';
  const count = Number(searchParams.get('count')) || 5;
  const page = Number(searchParams.get('page') || 0);
  const selectedOption = decodeURIComponent(option) as MYPAGE_FILTER_OPTIONS;
  const [itemId, setItemId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });
  const prevPage = useRef<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ['user-payment', selectedOption, count, page],
    queryFn: () =>
      getPaymentHistory(
        count,
        prevPage.current,
        page,
        itemId.firstItemId,
        itemId.lastItemId,
        selectedOption,
      ),
  });

  useEffect(() => {
    if (data) {
      const itemIds = {
        firstItemId: data.userPaymentsHistory[0]?.id,
        lastItemId:
          data.userPaymentsHistory[data.userPaymentsHistory.length - 1]?.id,
      };

      setItemId(itemIds);
      prevPage.current = page;
    }
  }, [data?.totalItemCount, selectedOption, count, page]);

  if (isLoading || !data)
    return (
      <div className="mx-auto mt-3 w-full max-w-[40rem] px-4 xl:mx-0">
        <h1 className="mb-2.5 border-b border-solid border-gray-700 pb-2.5 text-2xl font-bold text-gray-100">
          결제내역
        </h1>
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );

  const pageCount = Math.ceil(data.totalItemCount / count);

  const handleSearchParams = (params: { [key: string]: string | number }) => {
    const currentParams = new URLSearchParams(window.location.search);
    for (const key in params) {
      currentParams.set(key, String(params[key]));
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  const handleDisplayCount = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCount = Number(event.target.value);
    const queryObj = {
      option,
      count: newCount,
      page,
    };

    handleSearchParams(queryObj);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOption = event.target.id as MYPAGE_FILTER_OPTIONS;

    if (Object.values(MYPAGE_FILTER_OPTIONS).includes(newOption)) {
      const queryObj = {
        option: newOption,
        count,
        page: 0,
      };
      handleSearchParams(queryObj);

      setItemId({
        firstItemId: 0,
        lastItemId: 0,
      });
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    const queryObj = {
      option,
      count,
      page: selected,
    };

    handleSearchParams(queryObj);
  };

  const handlePaymentDelete = () => {
    const userConfirmed = window.confirm(
      '삭제내역은 복구할 수 없습니다. 정말로 삭제하겠습니까?',
    );
    if (userConfirmed) {
      // TO DO: API 처리
      toast.success('결제내역이 삭제되었습니다!');
    }
  };

  return (
    <section className="mx-auto mt-3 w-full max-w-[40rem] px-4 xl:mx-0">
      <h1 className="mb-2.5 border-b border-solid border-gray-700 pb-2.5 text-2xl font-bold text-gray-100">
        결제내역
      </h1>

      <div className="mb-4 flex justify-between gap-4 text-sm">
        <ul className="flex gap-4 whitespace-nowrap font-medium">
          {Object.values(MYPAGE_FILTER_OPTIONS).map((option) => (
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

        <PageSizeSelector value={count} onChange={handleDisplayCount} />
      </div>

      {data.totalItemCount > 0 ? (
        <div className="mb-4 flex flex-col gap-4">
          {data.userPaymentsHistory.map((data) => (
            <PaymentList
              key={data.id}
              {...data}
              handlePaymentDelete={handlePaymentDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyData selectedOption={selectedOption} />
      )}

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default PaymentHistory;

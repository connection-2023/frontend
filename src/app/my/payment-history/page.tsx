'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaymentList from './_components/PaymentList';
import { IMyPaymentInfo } from '@/types/types';

enum filterOptions {
  All = '전체',
  Class = '클래스',
  Pass = '패스권',
}

const mockData: IMyPaymentInfo[] = [
  {
    id: 2,
    orderId: 1,
    type: 'class',
    status: '결제완료',
    paymentDate: '23.11.05',
    image:
      'https://connection-bucket.s3.amazonaws.com/lectures/1700525913534_99F17695-2B35-4571-85FA-93114EB95768-55389-000021ABFC85CE19-min.JPG',
    count: 10,
    title: '원밀리언의 리아킴과 함께하는 댄스클래스',
    classTime: '23.11.07 11:00-11:50',
    price: 40000,
  },
  {
    id: 2,
    orderId: 2,
    type: 'class',
    status: '입금대기',
    paymentDate: '23.11.05',
    image:
      'https://connection-bucket.s3.amazonaws.com/lectures/1700525913534_99F17695-2B35-4571-85FA-93114EB95768-55389-000021ABFC85CE19-min.JPG',
    count: 10,
    title: '원밀리언의 리아킴과 함께하는 댄스클래스',
    classTime: '23.11.07 11:00-11:50',
    price: 40000,
  },
  {
    id: 2,
    orderId: 3,
    type: 'pass',
    status: '결제완료',
    paymentDate: '23.11.05',
    image:
      'https://connection-bucket.s3.amazonaws.com/lectures/1700525913534_99F17695-2B35-4571-85FA-93114EB95768-55389-000021ABFC85CE19-min.JPG',
    count: 10,
    title: '10회 초특가 패스권',
    price: 40000,
  },
];

const PaymentHistory = () => {
  const [selectedOption, setSelectedOption] = useState(filterOptions.All);
  const [displayCount, setDisplayCount] = useState(5);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.id as filterOptions;

    if (Object.values(filterOptions).includes(option)) {
      setSelectedOption(option);
    }
  };

  const handleDisplayCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayCount(Number(event.target.value));
    // api 호출
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
        {mockData.map((data) => (
          <PaymentList
            key={data.orderId}
            {...data}
            handlePaymentDelete={handlePaymentDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default PaymentHistory;

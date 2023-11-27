'use client';
import { useState } from 'react';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';
import { SelectClassType, couponGET } from '@/types/coupon';

interface CouponPassProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
}

const CouponPass = ({
  myLectureList,
  totalItemCount,
  couponList,
}: CouponPassProps) => {
  const [isInterested, setIsInterested] = useState(true);
  const [passStatusOptions, setPassStatusOptions] = useState('AVAILABLE');
  const [filterOption, setFilterOption] = useState('LATEST');
  const [selectedClass, setSelectedClass] = useState<SelectClassType | null>(
    myLectureList.length > 0
      ? {
          value: 'select-all',
          label: `전체 클래스(${myLectureList.length - 1})`,
        }
      : null,
  );

  const handleChangeOptions = (id: string) => {
    setPassStatusOptions(id);
  };

  const handleChangeSelectedClass = (selectedOptions: any) => {
    setSelectedClass(selectedOptions);
  };

  const options = [
    { id: 'AVAILABLE', label: '활성화 쿠폰' },
    { id: 'DISABLED', label: '만료 쿠폰' },
  ];

  return (
    <section className="col-span-2 flex w-full flex-col bg-white px-5 pt-5">
      <nav className="flex gap-6 pb-2">
        <button
          className={`flex text-2xl font-bold ${
            !isInterested && 'text-gray-500'
          }`}
          onClick={() => {
            setIsInterested(true);
            setPassStatusOptions('AVAILABLE');
          }}
        >
          쿠폰({totalItemCount})
        </button>
        <button
          className={`text-2xl font-bold ${isInterested && 'text-gray-500'}`}
          onClick={() => {
            setIsInterested(false);
            setPassStatusOptions('AVAILABLE');
          }}
        >
          패스권
        </button>
      </nav>

      <nav className="flex items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
              checked={passStatusOptions === option.id}
              onChange={() => handleChangeOptions(option.id)}
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-gray-500 peer-checked:text-black"
            >
              {option.label}
            </label>
          </button>
        ))}
        <div className="w-80">
          <ClassFilterSelect
            options={myLectureList}
            value={selectedClass}
            onChange={handleChangeSelectedClass}
          />
        </div>
      </nav>

      <nav className="flex gap-2.5 py-4">
        <button
          className={`flex text-sm font-bold ${
            filterOption !== 'LATEST' && 'text-gray-500'
          }`}
          onClick={() => setFilterOption('LATEST')}
        >
          최신순
        </button>
        <button
          className={`flex text-sm font-bold ${
            filterOption !== 'UPCOMING' && 'text-gray-500'
          }`}
          onClick={() => setFilterOption('UPCOMING')}
        >
          기간 임박순
        </button>
      </nav>

      {isInterested ? <CouponComponent couponList={couponList} /> : null}
    </section>
  );
};

export default CouponPass;

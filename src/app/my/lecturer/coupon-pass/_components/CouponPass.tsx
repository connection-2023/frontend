'use client';
import { useState } from 'react';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';
import { SelectClassType } from '@/types/coupon';

interface CouponPassProps {
  myLectureList: SelectClassType[];
}

const CouponPass = ({ myLectureList }: CouponPassProps) => {
  const [isInterested, setIsInterested] = useState(true);
  const [passStatusOptions, setPassStatusOptions] = useState('AVAILABLE');

  const handleChange = (id: string) => {
    setPassStatusOptions(id);
  };

  const options = [
    { id: 'AVAILABLE', label: '활성화 쿠폰' },
    { id: 'DISABLED', label: '비 활성화' },
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
          쿠폰
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
              onChange={() => handleChange(option.id)}
            />
            <label htmlFor={option.id} className="cursor-pointer">
              {option.label}
            </label>
          </button>
        ))}
        <ClassFilterSelect options={myLectureList} />
      </nav>

      {isInterested ? <CouponComponent /> : null}
    </section>
  );
};

export default CouponPass;

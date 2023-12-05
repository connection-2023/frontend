'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { CheckMarkSVG } from '@/icons/svg';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';

const CouponPass = () => {
  const [isInterested, setIsInterested] = useState(true);
  const [passStatusOptions, setPassStatusOptions] = useState('AVAILABLE');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassStatusOptions(event.target.value);
  };

  useEffect(() => {
    console.log(passStatusOptions);
  }, [passStatusOptions]);

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
          onClick={() => setIsInterested(true)}
        >
          쿠폰
        </button>
        <button
          className={`text-2xl font-bold ${isInterested && 'text-gray-500'}`}
          onClick={() => setIsInterested(false)}
        >
          패스권
        </button>
      </nav>

      <nav className="flex items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <div className="flex items-center gap-1" key={option.id}>
            <input
              id={option.id}
              type="radio"
              name="statusOptions"
              value={option.id}
              checked={passStatusOptions === option.id}
              onChange={handleChange}
              className="peer hidden"
            />
            <label
              htmlFor={option.id}
              className=" h-[1.125rem] w-[1.125rem] cursor-pointer rounded-sm border border-solid border-gray-500 fill-none text-sm peer-checked:bg-black peer-checked:fill-white"
            >
              <CheckMarkSVG />
            </label>
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
        <ClassFilterSelect />
      </nav>

      {isInterested ? <CouponComponent /> : null}
    </section>
  );
};

export default CouponPass;

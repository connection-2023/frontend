'use client';
import { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';
import { PAYMENT_ORDER_LIST } from '@/constants/constants';

const PaymentMethod = ({
  handlePaymentOption,
}: {
  handlePaymentOption: (index: number) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleSelectedChange = (index: number) => {
    setSelectedOption(index);
    handlePaymentOption(index);
  };

  return (
    <>
      <ul className="mt-4 flex gap-4 text-lg font-medium">
        {['현장결제', '선결제(무통장)'].map((option, index) => (
          <li key={option} className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id={option}
              checked={selectedOption === index}
              onChange={() => handleSelectedChange(index)}
              className="h-[18px] w-[18px] accent-sub-color1"
            />
            <label htmlFor={option}> {option}</label>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-y-3.5">
        {PAYMENT_ORDER_LIST[selectedOption].map((list, index) => (
          <li key={index} className="flex items-center text-gray-100">
            <p className="rounded-md border border-solid border-gray-100 px-2 py-1.5 text-base">
              {list}
            </p>

            <ArrowUpSVG
              width="28"
              height="28"
              className={`${
                index === PAYMENT_ORDER_LIST[selectedOption].length - 1 &&
                'hidden'
              } mx-1.5 origin-center rotate-90 fill-gray-100`}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PaymentMethod;

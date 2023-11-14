'use client';
import { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';

const ReadMore = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <input
        id="more-btn"
        type="checkbox"
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
        className="more-btn peer appearance-none"
      />
      <label
        htmlFor="more-btn"
        className={`absolute -bottom-4 flex h-28 w-full cursor-pointer  items-end justify-center ${
          isChecked ? '' : 'bg-gradient-to-t from-white from-30%'
        } text-center text-lg font-bold text-sub-color1`}
      >
        {isChecked ? (
          <p className="flex items-center">
            접기
            <ArrowUpSVG width="34" height="34" className="fill-sub-color1" />
          </p>
        ) : (
          <p className="underline">커리큘럼 더보기</p>
        )}
      </label>
    </>
  );
};

export default ReadMore;

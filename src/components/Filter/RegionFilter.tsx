'use client';
import { ADMINISTRATIVE_DISTRICT } from '@/constants/constants';
import React, { useState } from 'react';

const RegionFilter = () => {
  // const [focus, setFocus] = useState<string[]>();

  // const onFocus = (city : string) => {
  //   setFocus(true);
  // };

  return (
    <div className="flex max-h-[17rem] w-64 text-sm ">
      <ul className="scrollbar-thin scrollbar-track-[#F5F5F5] scrollbar-thumb-[#B6B6B6] flex w-2/5 flex-col gap-2 overflow-y-auto pt-3">
        {ADMINISTRATIVE_DISTRICT.map(({ city }) => (
          <li
            key={city}
            className="flex w-full items-center justify-center gap-2 "
            // onClick={() => onFocus(city)}
          >
            <input type="checkbox" className="h-[1.12rem] w-[1.12rem]" />
            {city}
          </li>
        ))}
      </ul>
      <ul className="scrollbar-thin scrollbar-track-[#F5F5F5] scrollbar-thumb-[#B6B6B6] flex w-3/5 flex-wrap content-start overflow-y-auto pt-3">
        {/* {ADMINISTRATIVE_DISTRICT.map(({ ward }) => (
          <li key={ward} className="">
            {ward}
          </li>
        ))} */}
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>

        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
        <div className="mb-2  h-5 w-1/2 text-center align-middle">
          {'중랑구'}
        </div>
      </ul>
    </div>
  );
};

export default RegionFilter;

const CityComponent = ({ city }: { city: string }) => {
  return (
    <li className="flex w-full items-center justify-center gap-2 ">
      <input type="checkbox" className="h-[1.12rem] w-[1.12rem]" />
      {city}
    </li>
  );
};

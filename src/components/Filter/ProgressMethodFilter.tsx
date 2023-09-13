'use client';
import React, { useState } from 'react';
import { PROGRESS_METHOD } from '@/constants/constants';

const ProgressMethodFilter = () => {
  const [filterList, setFilterList] = useState<string[]>([]);

  const changeFilterList = (method: string) => {
    setFilterList((prev) =>
      prev.includes(method)
        ? prev.filter((listMethod) => listMethod !== method)
        : [...prev, method],
    );
  };

  return (
    <ul className="flex w-[16.5rem] select-none flex-wrap pb-1 pt-3">
      {PROGRESS_METHOD.map((method) => {
        const isMethodIncluded = filterList.includes(method);

        return (
          <li key={method} className="mb-2 basis-1/2">
            <label
              className={`flex cursor-pointer items-center ${
                isMethodIncluded && 'font font-bold text-sub-color1'
              }`}
            >
              <input
                type="checkbox"
                checked={isMethodIncluded}
                onChange={() => changeFilterList(method)}
                className="ml-3 mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
              />
              {method}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgressMethodFilter;

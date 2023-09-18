'use client';
import { FILTER_TIME, FILTER_WEEK } from '../../constants/constants';
import React, { useState } from 'react';

const DateTimeFilter = () => {
  const [filterList, setFilterList] = useState<string[]>([]);

  const changeFilterList = (element: string) => {
    setFilterList((prev) =>
      prev.includes(element)
        ? prev.filter((listGenre) => listGenre !== element)
        : [...prev, element],
    );
  };

  return (
    <div className="flex max-h-[17rem] w-[16.8rem] select-none text-sm">
      <ul className="flex w-[32%] flex-col justify-center gap-2 border-r border-solid border-slate-300 py-3">
        {FILTER_WEEK.map((week) => (
          <CheckboxItem
            key={week}
            label={week}
            changeFilterList={changeFilterList}
            filterList={filterList}
          />
        ))}
      </ul>
      <ul className="flex w-[68%] flex-col gap-2 py-3">
        {FILTER_TIME.map((time) => (
          <CheckboxItem
            key={time}
            label={time}
            changeFilterList={changeFilterList}
            filterList={filterList}
          />
        ))}
      </ul>
    </div>
  );
};

interface CheckboxItemProps {
  label: (typeof FILTER_WEEK)[number] | (typeof FILTER_TIME)[number];
  changeFilterList: (element: string) => void;
  filterList: string[];
}

const CheckboxItem = ({
  label,
  changeFilterList,
  filterList,
}: CheckboxItemProps) => {
  const isdateIncluded = filterList.includes(label);

  return (
    <li className="ml-4">
      <label
        className={`inline-flex cursor-pointer items-center ${
          isdateIncluded && 'font font-bold text-sub-color1'
        }`}
      >
        <input
          type="checkbox"
          checked={isdateIncluded}
          onChange={() => changeFilterList(label)}
          className="mr-2 h-[1.12rem] w-[1.12rem] accent-sub-color1"
        />
        {label}
      </label>
    </li>
  );
};

export default DateTimeFilter;

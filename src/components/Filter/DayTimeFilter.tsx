'use client';
import { useState, useEffect } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import { FILTER_TIME, FILTER_WEEK } from '../../constants/constants';
import { day } from '@/types/class';

interface IDayTimeFilterProps {
  filterOption: {
    week: day[];
    time: string[];
  };
}

const DayTimeFilter = ({ filterOption }: IDayTimeFilterProps) => {
  const [filterList, setFilterList] = useState(filterOption);
  const { changeMultipleParams } = useChangeSearchParams();
  const label = '요일/시간대';

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const changeFilterList = (element: day | string, filter: 'week' | 'time') => {
    setFilterList((prev) => {
      const filterList = (prev[filter] as Array<string>).includes(element)
        ? prev[filter].filter((listGenre) => listGenre !== element)
        : [...prev[filter], element];

      return { ...prev, [filter]: filterList };
    });
  };

  const onReset = () => {
    setFilterList({
      week: [],
      time: [],
    });
  };

  const onApply = () => {
    changeMultipleParams([
      { name: 'days', value: filterList.week },
      {
        name: 'timeOfDay',
        value: filterList.time.map(
          (time) => FILTER_TIME.find(({ label }) => label === time)!.value,
        ),
      },
    ]);
  };

  const onClose = () => {
    setFilterList(filterOption);
  };

  return (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <div className="flex max-h-[17rem] w-[16.8rem] select-none text-sm">
        <ul className="flex w-[32%] flex-col justify-center gap-2 border-r border-solid border-slate-300 py-3">
          {FILTER_WEEK.map((week) => (
            <CheckboxItem
              key={week}
              label={week}
              changeFilterList={changeFilterList}
              filterList={filterList.week}
            />
          ))}
        </ul>
        <ul className="flex w-[68%] flex-col gap-2 py-3">
          {FILTER_TIME.map(({ label }) => (
            <CheckboxItem
              key={label}
              label={label}
              changeFilterList={changeFilterList}
              filterList={filterList.time}
            />
          ))}
        </ul>
      </div>
    </FilterModal>
  );
};

interface CheckboxItemProps {
  label: string;
  changeFilterList: (element: day | string, filter: 'week' | 'time') => void;
  filterList: string[];
}

const CheckboxItem = ({
  label,
  changeFilterList,
  filterList,
}: CheckboxItemProps) => {
  const isdateIncluded = filterList.some((item) => item === label);
  const filter = FILTER_TIME.some((item) => item.label === label)
    ? 'time'
    : 'week';

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
          onChange={() => changeFilterList(label, filter)}
          className="mr-2 h-[1.12rem] w-[1.12rem] accent-sub-color1"
        />
        {label}
      </label>
    </li>
  );
};

export default DayTimeFilter;

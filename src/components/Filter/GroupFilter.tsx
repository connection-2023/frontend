'use client';
import { useEffect, useState } from 'react';
import { GROUP_FILTER_DEFAULT, GROUP_FILTER_LIST } from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';

interface IGroupFilterProps {
  filterOption: string;
}
const GroupFilter = ({ filterOption }: IGroupFilterProps) => {
  const [selectFilter, setSelectFilter] = useState(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '인원';

  useEffect(() => {
    setSelectFilter(filterOption);
  }, [filterOption]);

  const onReset = () => {
    setSelectFilter(GROUP_FILTER_DEFAULT);
  };

  const onApply = () => {
    changeParams({
      name: 'group',
      value: selectFilter === '그룹레슨' ? '' : selectFilter,
    });
  };

  const onClose = () => {
    setSelectFilter(filterOption);
  };

  return (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <ul className="flex max-h-80 w-56 select-none flex-col gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500  scrollbar-thumb-rounded-lg scrollbar-w-1">
        {GROUP_FILTER_LIST.map((group) => (
          <li key={group} className="ml-4 flex items-center">
            <input
              id={group}
              type="checkbox"
              checked={group === selectFilter}
              onChange={() => setSelectFilter(group)}
              className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
            />
            <label
              htmlFor={group}
              className={`cursor-pointer
             ${group === selectFilter && 'font font-bold text-sub-color1'}`}
            >
              {group}
            </label>
          </li>
        ))}
      </ul>
    </FilterModal>
  );
};

export default GroupFilter;

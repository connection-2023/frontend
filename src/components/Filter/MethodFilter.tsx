'use client';
import { useEffect, useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import { METHOD_FILTER_LIST } from '../../constants/constants';

interface IMethodFilterProps {
  filterOption: string;
}

const MethodFilter = ({ filterOption }: IMethodFilterProps) => {
  const [selectFilter, setSelectFilter] = useState(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '진행 방식';

  useEffect(() => {
    setSelectFilter(filterOption);
  }, [filterOption]);

  const onReset = () => {
    setSelectFilter('전체');
  };

  const onApply = () => {
    changeParams({
      name: 'method',
      value: selectFilter === '전체' ? '' : selectFilter,
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
        {METHOD_FILTER_LIST.map((method) => {
          return (
            <li key={method} className="ml-4 flex items-center">
              <input
                id={method}
                type="checkbox"
                checked={method === selectFilter}
                onChange={() => setSelectFilter(method)}
                className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
              />
              <label
                htmlFor={method}
                className={`cursor-pointer
             ${method === selectFilter && 'font font-bold text-sub-color1'}`}
              >
                {method}
              </label>
            </li>
          );
        })}
      </ul>
    </FilterModal>
  );
};

export default MethodFilter;

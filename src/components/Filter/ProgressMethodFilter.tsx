import { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import { PROGRESS_METHOD } from '../../constants/constants';
import { IFilterOptions } from '@/types/types';

interface IMethodFilterProps {
  updateFilterOption: (label: string, option: IFilterOptions['method']) => void;
  filterOption: string[];
}

const ProgressMethodFilter = ({
  filterOption,
  updateFilterOption,
}: IMethodFilterProps) => {
  const [filterList, setFilterList] = useState<string[]>(filterOption);
  const label = '진행방식';

  const changeFilterList = (method: string) => {
    setFilterList((prev) =>
      prev.includes(method)
        ? prev.filter((listMethod) => listMethod !== method)
        : [...prev, method],
    );
  };

  const onReset = () => {
    setFilterList([]);
    updateFilterOption(label, []);
  };

  const onApply = () => {
    updateFilterOption(label, filterList);
  };

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  return (
    <FilterModal label={label} onReset={onReset} onApply={onApply}>
      <ul className="flex w-[16.6rem] select-none flex-wrap pb-1 pt-3">
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
    </FilterModal>
  );
};

export default ProgressMethodFilter;

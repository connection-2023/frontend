import { useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import Filters from '@/components/Filter/Filters';
import FineSplitIcon from '@/components/InstructorCard/FineSplitIcon';
import LargeSplitIcon from '@/components/InstructorCard/LargeSplitIcon';
import { IFilterOptions } from '@/types/types';

interface FilterComponentProps {
  largeImg: boolean;
  imgStateHandler: (state: boolean) => void;
  filterOptions: IFilterOptions;
  sortOption: 'LATEST' | 'STARS';
}

const FilterComponent = ({
  largeImg,
  imgStateHandler,
  filterOptions,
  sortOption,
}: FilterComponentProps) => {
  const { changeParams } = useChangeSearchParams();

  const sortOptionList: {
    id: 'LATEST' | 'STARS';
    label: string;
  }[] = [
    {
      id: 'LATEST',
      label: '최신순',
    },
    {
      id: 'STARS',
      label: '별점순',
    },
  ];

  return (
    <nav className="mt-4 flex flex-col gap-1">
      <Filters type="instructor" defaultOption={filterOptions} />

      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-5">
          {sortOptionList.map((option) => (
            <div key={option.id} className="flex items-center gap-1">
              <input
                id={option.id}
                type="checkbox"
                className="peer h-[18px] w-[18px] accent-black"
                checked={sortOption === option.id}
                onChange={() =>
                  changeParams({ name: 'sortOption', value: option.id })
                }
              />
              <label
                htmlFor={option.id}
                className="cursor-pointer text-gray-500 peer-checked:text-black"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <div className="flex gap-3 sm:hidden">
          <LargeSplitIcon
            activated={largeImg}
            imgStateHandler={imgStateHandler}
          />
          <FineSplitIcon
            activated={!largeImg}
            imgStateHandler={imgStateHandler}
          />
        </div>
      </div>
    </nav>
  );
};

export default FilterComponent;

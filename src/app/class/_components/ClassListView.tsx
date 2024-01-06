'use client';

import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { classSearchData } from '@/types/types';

interface ClassListViewProps {
  searchData: classSearchData;
  children: React.ReactNode;
}

const ClassListView = ({ children, searchData }: ClassListViewProps) => {
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
    <div className="px-4 sm:px-9 xl:px-14">
      <nav className="mt-4 flex flex-col gap-1">
        {children}

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-5">
            {sortOptionList.map((option) => (
              <div key={option.id} className="flex items-center gap-1">
                <input
                  id={option.id}
                  type="checkbox"
                  className="peer h-[18px] w-[18px] accent-black"
                  checked={searchData.sortOption === option.id}
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
        </div>
      </nav>
    </div>
  );
};

export default ClassListView;

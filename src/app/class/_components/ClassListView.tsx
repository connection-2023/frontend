'use client';

import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import { ClassCardType } from '@/types/class';
import { classSearchData } from '@/types/types';

interface ClassListViewProps {
  searchData: classSearchData;
  children: React.ReactNode;
  classList: ClassCardType[];
}

const ClassListView = ({
  children,
  searchData,
  classList,
}: ClassListViewProps) => {
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

      <div className="my-4 grid gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-y-12 lg:grid-cols-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-4">
        {classList.map((classData) => (
          <ClassPreview key={classData.id} {...classData} />
        ))}
      </div>
    </div>
  );
};

export default ClassListView;

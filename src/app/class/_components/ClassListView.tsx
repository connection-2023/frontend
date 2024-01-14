'use client';

import { useEffect, useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import useIntersect from '@/hooks/useIntersect';
import { NotFoundSVG } from '@/icons/svg';
import { searchClasses } from '@/lib/apis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformSearchClass } from '@/utils/apiDataProcessor';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import Spinner from '@/components/Spinner/Spinner';
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
  const [classLists, setClassLists] = useState(classList);
  const [searchState, setSearchState] = useState({ ...searchData });
  const { userType } = useUserStore.getState();

  useEffect(() => {
    setClassLists([...classList]);

    setSearchState({
      ...searchData,
      searchAfter: classList.at(-1)?.searchAfter!,
    });
  }, [classList, searchData]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

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

  const searchInstructorsHandler = async () => {
    const classLists = await searchClasses(searchState, userType === 'user');

    setSearchState((state) => ({
      ...state,
      searchAfter: classLists.at(-1)?.searchAfter,
    }));
    setClassLists((prev) => [...prev, ...transformSearchClass(classLists)]);
  };

  const { ref, loading } = useIntersect(searchInstructorsHandler, options);

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

      <div
        className={`my-4 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-y-12 lg:grid-cols-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-4 ${
          classLists.length > 0 ? 'grid' : 'hidden'
        }`}
      >
        {classLists.map((classData, index) => (
          <div
            ref={
              index === classLists.length - 1 && searchState.searchAfter
                ? ref
                : undefined
            }
            key={classData.id}
          >
            <ClassPreview {...classData} />
          </div>
        ))}
      </div>

      <div
        className={`my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100 ${
          classLists.length > 0 ? 'hidden' : 'block'
        }`}
      >
        <NotFoundSVG />
        <p>검색된 결과가 없습니다</p>
      </div>

      {loading && (
        <div className="mb-5 flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ClassListView;

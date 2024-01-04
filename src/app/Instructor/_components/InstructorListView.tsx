'use client';
import { useEffect, useRef, useState } from 'react';
import useIntersect from '@/hooks/useIntersect';
import { NotFoundSVG } from '@/icons/svg';
import { searchInstructors } from '@/lib/apis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformSearchInstructor } from '@/utils/apiDataProcessor';
import NavComponent from './NavComponent';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import Spinner from '@/components/Spinner/Spinner';
import { InstructorCardProps, instructorSearchData } from '@/types/types';

interface InstructorListViewProps {
  instructorList: InstructorCardProps[];
  searchData: instructorSearchData;
  children: React.ReactNode;
}

const InstructorListView = ({
  instructorList,
  searchData,
  children,
}: InstructorListViewProps) => {
  const [largeImg, setLargeImg] = useState(true);
  const [instructors, setInstructors] = useState(instructorList);
  const [searchState, setSearchState] = useState({ ...searchData });
  const { userType } = useUserStore.getState();

  useEffect(() => {
    setInstructors([...instructorList]);

    setSearchState({
      ...searchData,
      searchAfter: instructorList.at(-1)?.searchAfter,
    });
  }, [instructorList, searchData]);

  useEffect(() => {
    const storedValue = localStorage.getItem('cardState');
    if (storedValue !== null) {
      setLargeImg(storedValue === 'large');
    }
  }, []);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const searchInstructorsHandler = async () => {
    const instructors = await searchInstructors(
      searchState,
      userType === 'user',
    );

    setSearchState((state) => ({
      ...state,
      searchAfter: instructors.at(-1)?.searchAfter,
    }));
    instructorList = transformSearchInstructor(instructors);
    setInstructors((prev) => [...prev, ...instructorList]);
  };

  const { ref, loading } = useIntersect(searchInstructorsHandler, options);

  const imgStateHandler = (state: boolean) => {
    setLargeImg(state);
    localStorage.setItem('cardState', state ? 'large' : 'small');
  };

  return (
    <div className="px-4 sm:px-9 xl:px-14">
      <NavComponent
        largeImg={largeImg}
        imgStateHandler={imgStateHandler}
        sortOption={searchData.sortOption}
      >
        {children}
      </NavComponent>

      <div
        className={`my-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 ${
          largeImg ? 'grid-cols-1' : 'grid-cols-2'
        } ${instructors.length > 0 ? 'grid' : 'hidden'}`}
      >
        {instructors.map((info, index) => {
          const newInfo = { ...info, largeImg };
          return (
            <div
              ref={
                index === instructors.length - 1 && searchState.searchAfter
                  ? ref
                  : undefined
              }
              key={info.id + index}
              className="h-60"
            >
              <InstructorCard {...newInfo} />
            </div>
          );
        })}
      </div>

      <div
        className={`my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100 ${
          instructors.length > 0 ? 'hidden' : 'block'
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

export default InstructorListView;

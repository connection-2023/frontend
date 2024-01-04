'use client';
import { useEffect, useRef, useState } from 'react';
import useIntersect from '@/hooks/useIntersect';
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
  const { userType } = useUserStore.getState();
  const searchDataRef = useRef(searchData);

  // useEffect(() => {
  //   setInstructors(instructorList);
  //   searchDataRef.current = searchData;
  // }, [instructorList]);

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
      searchDataRef.current,
      userType === 'user',
    );

    searchDataRef.current.searchAfter = instructors.at(-1)?.searchAfter;
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
        className={`my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 ${
          largeImg ? 'grid-cols-1' : 'grid-cols-2'
        }`}
      >
        {instructors.map((info, index) => {
          const newInfo = { ...info, largeImg };
          return (
            <div
              ref={
                index === instructors.length - 1 &&
                searchDataRef.current.searchAfter
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

      {loading && (
        <div className="mb-5 flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default InstructorListView;

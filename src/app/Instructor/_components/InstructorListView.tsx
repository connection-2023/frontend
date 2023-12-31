'use client';
import { useEffect, useState } from 'react';
import NavComponent from './NavComponent';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
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

  useEffect(() => {
    const storedValue = localStorage.getItem('cardState');
    if (storedValue !== null) {
      setLargeImg(storedValue === 'large');
    }
  }, []);

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
        {instructorList.map((info, index) => {
          const newInfo = { ...info, largeImg };
          return (
            <div key={info.id + index} className="h-60">
              <InstructorCard {...newInfo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorListView;

'use client';
import { useEffect, useState } from 'react';
import FilterComponent from './FilterComponent';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import {
  IFilterOptions,
  InstructorCardProps,
  instructorSearchData,
} from '@/types/types';

const InstructorListView = ({
  instructorList,
  filterOptions,
  searchData,
}: {
  instructorList: InstructorCardProps[];
  filterOptions: IFilterOptions;
  searchData: instructorSearchData;
}) => {
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
      <FilterComponent
        largeImg={largeImg}
        imgStateHandler={imgStateHandler}
        filterOptions={filterOptions}
        sortOption={searchData.sortOption}
      />

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

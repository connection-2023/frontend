'use client';
import { useState } from 'react';
import FilterComponent from './FilterComponent';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { InstructorCardProps } from '@/types/types';

const InstructorListView = ({
  instructorList,
}: {
  instructorList: InstructorCardProps[];
}) => {
  const [largeImg, setLargeImg] = useState(true);

  const imgStateHandler = (state: boolean) => {
    setLargeImg(state);
  };

  return (
    <div className="px-4 sm:px-9 xl:px-14">
      <FilterComponent largeImg={largeImg} imgStateHandler={imgStateHandler} />

      <div
        className={`mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 ${
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

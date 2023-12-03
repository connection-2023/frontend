import { useState } from 'react';
import { FilterSVG } from '@/icons/svg';

interface ClassFilterSelectUserProps {
  userClassFilterView: boolean;
  changeUserClassFilterView: () => void;
  filterState: string;
}

const ClassFilterSelectUser = ({
  userClassFilterView,
  changeUserClassFilterView,
  filterState,
}: ClassFilterSelectUserProps) => {
  return (
    <button
      className={`flex gap-1 ${
        userClassFilterView && filterState === 'AVAILABLE'
          ? 'text-black'
          : 'text-gray-500'
      }`}
      onClick={changeUserClassFilterView}
    >
      <FilterSVG
        className={`h-6 w-6  ${
          userClassFilterView && filterState === 'AVAILABLE'
            ? 'fill-black'
            : 'fill-gray-500'
        }`}
      />
      <p className={userClassFilterView ? 'block' : 'hidden sm:block'}>
        적용 가능한 모든 클래스 보기
      </p>
    </button>
  );
};

export default ClassFilterSelectUser;

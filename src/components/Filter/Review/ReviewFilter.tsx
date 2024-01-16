import React from 'react';
import Rating from '@/components/Review/Rating';

interface ReviewFilter {
  rate: number;
  handleRate: (value: number) => void;
}

const ReviewFilter = ({ rate, handleRate }: ReviewFilter) => {
  return (
    <>
      <div className="p-4">
        <Rating rate={rate} handleRate={handleRate} bigStar={true} />
      </div>
      <div className="px-4 text-sm sm:hidden">
        드래그해서 별점을 설정해주세요
      </div>
    </>
  );
};

export default ReviewFilter;

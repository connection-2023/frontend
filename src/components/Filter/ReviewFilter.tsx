'use client';
import { useState, useEffect } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import Rating from '../Review/Rating';

interface IReviewFilterProps {
  filterOption: number;
}

const ReviewFilter = ({ filterOption }: IReviewFilterProps) => {
  const [rate, setRate] = useState<number>(filterOption);
  const { changeParams, removeParams } = useChangeSearchParams();
  const label = '평점';

  useEffect(() => {
    setRate(filterOption);
  }, [filterOption]);

  const handleRate = (value: number) => {
    setRate(value);
  };

  const onReset = () => {
    setRate(0);
  };

  const onApply = () => {
    if (rate === 0) {
      removeParams('stars');
    } else {
      changeParams({ name: 'stars', value: String(rate) });
    }
  };

  const onClose = () => {
    setRate(filterOption);
  };

  return (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <Rating rate={rate} handleRate={handleRate} />
    </FilterModal>
  );
};

export default ReviewFilter;

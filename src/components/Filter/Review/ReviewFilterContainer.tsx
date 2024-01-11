'use client';
import { useState, useEffect } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store/filterStore';
import ReviewFilter from './ReviewFilter';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface IReviewFilterContainerProps {
  filterOption: number;
}

const ReviewFilterContainer = ({
  filterOption,
}: IReviewFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore();
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

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={rate} onReset={onReset}>
      <ReviewFilter rate={rate} handleRate={handleRate} />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <ReviewFilter rate={rate} handleRate={handleRate} />
    </FilterModal>
  );
};

export default ReviewFilterContainer;

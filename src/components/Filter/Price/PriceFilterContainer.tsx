'use client';
import { useState, useEffect } from 'react';
import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store';
import PriceFilter from './PriceFilter';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface IPriceFilterContainerProps {
  filterOption: number[];
}

const PriceFilterContainer = ({ filterOption }: IPriceFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore((state) => ({
    isfilterModalOpen: state.isfilterModalOpen,
  }));
  const [values, setValues] = useState(filterOption);
  const [draggingThumbIndex, setDraggingThumbIndex] = useState<number | null>(
    null,
  );
  const { changeMultipleParams } = useChangeSearchParams();
  const label = '가격';

  const onChangeDraggingThumbIndex = (index: number | null) => {
    setDraggingThumbIndex(index);
  };

  useEffect(() => {
    setValues(filterOption);
  }, [filterOption]);

  const onChangeValue = (values: number[]) => {
    setValues(values);
  };

  const onReset = () => {
    setValues([PRICE_FILTER_MIN, PRICE_FILTER_MAX]);
  };

  const onApply = () => {
    const [min, max] = values;

    changeMultipleParams([
      { name: 'gtePrice', value: min === PRICE_FILTER_MIN ? '' : String(min) },
      { name: 'ltePrice', value: max === PRICE_FILTER_MAX ? '' : String(max) },
    ]);
  };

  const onClose = () => {
    setValues(filterOption);
  };

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={values} onReset={onReset}>
      <PriceFilter
        values={values}
        draggingThumbIndex={draggingThumbIndex}
        onChangeValue={onChangeValue}
        onChangeDraggingThumbIndex={onChangeDraggingThumbIndex}
      />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <PriceFilter
        values={values}
        draggingThumbIndex={draggingThumbIndex}
        onChangeValue={onChangeValue}
        onChangeDraggingThumbIndex={onChangeDraggingThumbIndex}
      />
    </FilterModal>
  );
};

export default PriceFilterContainer;

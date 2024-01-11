'use client';
import { useEffect, useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store/filterStore';
import MethodFilter from './MethodFilter';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface MethodFilterContainerProps {
  filterOption: string;
}

const MethodFilterContainer = ({
  filterOption,
}: MethodFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore();
  const [selectFilter, setSelectFilter] = useState(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '진행 방식';

  useEffect(() => {
    setSelectFilter(filterOption);
  }, [filterOption]);

  const onChangeSelectFilter = (value: string) => {
    setSelectFilter(value);
  };

  const onReset = () => {
    setSelectFilter('전체');
  };

  const onApply = () => {
    changeParams({
      name: 'method',
      value: selectFilter === '전체' ? '' : selectFilter,
    });
  };

  const onClose = () => {
    setSelectFilter(filterOption);
  };

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={selectFilter} onReset={onReset}>
      <MethodFilter
        selectFilter={selectFilter}
        onChangeSelectFilter={onChangeSelectFilter}
      />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <MethodFilter
        selectFilter={selectFilter}
        onChangeSelectFilter={onChangeSelectFilter}
      />
    </FilterModal>
  );
};

export default MethodFilterContainer;

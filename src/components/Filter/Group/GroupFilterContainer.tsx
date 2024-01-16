'use client';
import { useEffect, useState } from 'react';
import { GROUP_FILTER_DEFAULT } from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store';
import GroupFilter from './GroupFilter';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface GroupFilterContainerProps {
  filterOption: string;
}
const GroupFilterContainer = ({ filterOption }: GroupFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore((state) => ({
    isfilterModalOpen: state.isfilterModalOpen,
  }));
  const [selectFilter, setSelectFilter] = useState(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '인원';

  useEffect(() => {
    setSelectFilter(filterOption);
  }, [filterOption]);

  const onChangeSelectFilter = (value: string) => {
    setSelectFilter(value);
  };

  const onReset = () => {
    setSelectFilter(GROUP_FILTER_DEFAULT);
  };

  const onApply = () => {
    changeParams({
      name: 'group',
      value: selectFilter === '그룹레슨' ? '' : selectFilter,
    });
  };

  const onClose = () => {
    setSelectFilter(filterOption);
  };

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={selectFilter} onReset={onReset}>
      <GroupFilter
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
      <GroupFilter
        selectFilter={selectFilter}
        onChangeSelectFilter={onChangeSelectFilter}
      />
    </FilterModal>
  );
};

export default GroupFilterContainer;

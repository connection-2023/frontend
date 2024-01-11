'use client';
import { useState, useEffect } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store/filterStore';
import DayTimeFilter from './DayTimeFilter';
import { FILTER_TIME } from '../../../constants/constants';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';
import { day } from '@/types/class';
import { DayTimeFilterOption } from '@/types/types';

interface DayTimeFilterContainerProps {
  filterOption: DayTimeFilterOption;
}

const DayTimeFilterContainer = ({
  filterOption,
}: DayTimeFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore();
  const [filterList, setFilterList] = useState(filterOption);
  const { changeMultipleParams } = useChangeSearchParams();
  const label = '요일/시간대';

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const changeFilterList = (element: day | string, filter: 'week' | 'time') => {
    setFilterList((prev) => {
      const filterList = (prev[filter] as Array<string>).includes(element)
        ? prev[filter].filter((listGenre) => listGenre !== element)
        : [...prev[filter], element];

      return { ...prev, [filter]: filterList };
    });
  };

  const onReset = () => {
    setFilterList({
      week: [],
      time: [],
    });
  };

  const onApply = () => {
    changeMultipleParams([
      { name: 'days', value: filterList.week },
      {
        name: 'timeOfDay',
        value: filterList.time.map(
          (time) => FILTER_TIME.find(({ label }) => label === time)!.value,
        ),
      },
    ]);
  };

  const onClose = () => {
    setFilterList(filterOption);
  };

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={filterList} onReset={onReset}>
      <DayTimeFilter
        filterList={filterList}
        changeFilterList={changeFilterList}
      />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <DayTimeFilter
        filterList={filterList}
        changeFilterList={changeFilterList}
      />
    </FilterModal>
  );
};

export default DayTimeFilterContainer;

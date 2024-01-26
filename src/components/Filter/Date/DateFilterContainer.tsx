'use client';
import { useState, useEffect, useMemo } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store';
import {
  formatDateWithHyphens,
  parseHyphenatedDate,
} from '@/utils/dateTimeUtils';
import RangeCalendar from '../../Calendar/RangeCalendar';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface DateFilterContainerProps {
  filterOption: string[];
}

const DateFilterContainer = ({ filterOption }: DateFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore((state) => ({
    isfilterModalOpen: state.isfilterModalOpen,
  }));
  const [gteDate, lteDate] = filterOption;
  const [fromValue, setFromValue] = useState<string | undefined>(gteDate);
  const [toValue, setToValue] = useState<string | undefined>(lteDate);
  const { changeMultipleParams } = useChangeSearchParams();

  const classRange = {
    from: fromValue ? parseHyphenatedDate(fromValue) : undefined,
    to: toValue ? parseHyphenatedDate(toValue) : undefined,
  };
  const filterList = useMemo(() => [fromValue, toValue], [fromValue, toValue]);

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!range) return;
    if (range?.from) {
      setFromValue(formatDateWithHyphens(range.from));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(formatDateWithHyphens(range.to));
    } else {
      setToValue('');
    }
  };

  const label = '지정날짜';

  useEffect(() => {
    const [gteDate, lteDate] = filterOption;
    setFromValue(gteDate);
    setToValue(lteDate);
  }, [filterOption]);

  const onReset = () => {
    setFromValue('');
    setToValue('');
  };

  const onApply = () => {
    changeMultipleParams([
      { name: 'gteDate', value: fromValue ? fromValue : '' },
      { name: 'lteDate', value: toValue ? toValue : '' },
    ]);
  };

  const onClose = () => {
    setFromValue(gteDate);
    setToValue(lteDate);
  };

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={filterList} onReset={onReset}>
      <div className="relative h-[214px]">
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <RangeCalendar
            mode="class"
            selectedRange={classRange}
            handleRangeSelect={handleRangeSelect}
            numberOfMonths={1}
          />
        </div>
      </div>
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <RangeCalendar
        mode="class"
        selectedRange={classRange}
        handleRangeSelect={handleRangeSelect}
        numberOfMonths={1}
      />
    </FilterModal>
  );
};

export default DateFilterContainer;

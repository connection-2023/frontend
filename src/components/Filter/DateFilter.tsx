'use client';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { useState, useEffect } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import FilterModal from './FilterModal';
import RangeCalendar from '../Calendar/RangeCalendar';
import { IFilterOptions } from '@/types/types';

interface IDateFilterProps {
  filterOption: string[];
}

const DateFilter = ({ filterOption }: IDateFilterProps) => {
  const [fromValue, setFromValue] = useState<string | undefined>(undefined);
  const [toValue, setToValue] = useState<string | undefined>(undefined);

  const classRange = {
    from: fromValue ? parse(fromValue, 'y-MM-dd', new Date()) : undefined,
    to: toValue ? parse(toValue, 'y-MM-dd', new Date()) : undefined,
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!range) return;
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };

  const label = '지정날짜';

  useEffect(() => {
    // const dateVal = filterOption.map((date) => new Date(date));
  }, [filterOption]);

  const onReset = () => {
    setFromValue('');
    setToValue('');
  };

  const onApply = () => {
    console.log(fromValue);
    console.log(toValue);
  };

  return (
    <FilterModal label={label} onReset={onReset} onApply={onApply}>
      <RangeCalendar
        mode="class"
        selectedRange={classRange}
        handleRangeSelect={handleRangeSelect}
        numberOfMonths={1}
      />
    </FilterModal>
  );
};

export default DateFilter;

'use client';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { useState, useEffect } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import RangeCalendar from '../Calendar/RangeCalendar';

interface IDateFilterProps {
  filterOption: string[];
}

const DateFilter = ({ filterOption }: IDateFilterProps) => {
  const [gteDate, lteDate] = filterOption;
  const [fromValue, setFromValue] = useState<string | undefined>(gteDate);
  const [toValue, setToValue] = useState<string | undefined>(lteDate);
  const { changeMultipleParams } = useChangeSearchParams();

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

  return (
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

export default DateFilter;

import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { useRecoilState } from 'recoil';
import { BasicCalendarSVG } from '@/icons/svg';
import { classRangeState } from '@/recoil/ClassSchedule/atoms';
import RangeCalendar from '@/components/Calendar/RangeCalendar';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

const ClassRange = ({
  onChange,
  defaultValue = { startDate: '', endDate: '' },
}: {
  onChange?: (value: DateRange | undefined) => void;
  defaultValue?: { startDate: string; endDate: string };
}) => {
  const [classRange, setClassRange] = useRecoilState(classRangeState);
  const [fromValue, setFromValue] = useState<string>(defaultValue.startDate);
  const [toValue, setToValue] = useState<string>(defaultValue.endDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const from = new Date(defaultValue.startDate);
    const to = new Date(defaultValue.endDate);
    setClassRange({ from, to });
    if (onChange) {
      onChange({ from, to });
    }
  }, [defaultValue, setClassRange]);

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const updateSelectedRange = useCallback((date: Date) => {
    setClassRange((current) => {
      if (!current) return { from: date, to: undefined };
      if (isAfter(date, current.to || new Date(0)))
        return { from: current.to || new Date(0), to: date };
      if (isBefore(date, current.from || new Date(0)))
        return { from: date, to: current.from || new Date(0) };
      return { ...current, from: date };
    });
  }, []);

  const handleDateChange =
    (setDateValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateValue(e.target.value);
      const date = parse(e.target.value, 'y-MM-dd', new Date());

      if (!isValid(date)) {
        setClassRange({ from: undefined, to: undefined });
        return;
      }

      updateSelectedRange(date);
    };

  const handleFromChange = handleDateChange(setFromValue);
  const handleToChange = handleDateChange(setToValue);

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    setClassRange(range);
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

  return (
    <div ref={ref}>
      <div className="relative flex h-7 w-full max-w-[312px] items-center rounded-[0.31rem] border border-solid border-sub-color2 pl-[0.69rem] text-base text-sub-color3">
        <DateInput
          placeholder="시작 날짜"
          value={fromValue}
          onChange={handleFromChange}
          openCalendar={openCalendar}
        />
        <span className="mx-1"> – </span>
        <DateInput
          placeholder="마지막 날짜"
          value={toValue}
          onChange={handleToChange}
          openCalendar={openCalendar}
        />
        <span className="mr-2 flex w-full justify-end">
          <BasicCalendarSVG
            onClick={() => setIsCalendarVisible((prev) => !prev)}
            className="flex cursor-pointer fill-sub-color1"
          />
        </span>
        {isCalendarVisible && (
          <RangeCalendar
            selectedRange={classRange}
            handleRangeSelect={handleRangeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ClassRange);

interface IDateInputProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  openCalendar: () => void;
}

const DateInput = ({
  placeholder,
  value,
  onChange,
  openCalendar,
}: IDateInputProps) => (
  <input
    size={10}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onFocus={openCalendar}
    className="px-1"
  />
);

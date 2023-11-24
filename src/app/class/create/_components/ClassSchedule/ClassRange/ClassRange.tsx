import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG } from '@/icons/svg';
import { useClassScheduleStore } from '@/store';
import RangeCalendar from '@/components/Calendar/RangeCalendar';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

const ClassRange = ({
  onChange,
  defaultValue = { startDate: '', endDate: '' },
}: {
  onChange: (value: { startDate: string; endDate: string }) => void;
  defaultValue?: { startDate: string; endDate: string };
}) => {
  const [fromValue, setFromValue] = useState<string>(defaultValue.startDate);
  const [toValue, setToValue] = useState<string>(defaultValue.endDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const ref = useRef(null);
  const store = useClassScheduleStore();

  useEffect(() => {
    const { endDate, startDate } = defaultValue;
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    const isValidStartDate = dateFormat.test(startDate);
    const isValidEndDate = dateFormat.test(endDate);

    if (isValidStartDate && isValidEndDate) {
      const from = new Date(defaultValue.startDate);
      const to = new Date(defaultValue.endDate);
      store.setClassRange({ from, to });
    }
  }, [defaultValue]);

  useEffect(() => {
    onChange({ startDate: fromValue, endDate: toValue });
  }, [fromValue, toValue]);

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const updateSelectedRange = useCallback(
    (date: Date) => {
      const computeNewRange = (currentRange?: DateRange) => {
        if (!currentRange) {
          return { from: date, to: undefined };
        }

        const { from, to } = currentRange;

        if (isAfter(date, to || new Date(0))) {
          return { from: to || new Date(0), to: date };
        }

        if (isBefore(date, from || new Date(0))) {
          return { from: date, to: from || new Date(0) };
        }

        return { ...currentRange, from: date };
      };
      const classRange = store.classRange;
      const newRange = computeNewRange(classRange);
      store.setClassRange(newRange);
    },
    [store.classRange],
  );

  const handleDateChange =
    (setDateValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateValue(e.target.value);
      const date = parse(e.target.value, 'y-MM-dd', new Date());

      if (!isValid(date)) {
        store.setClassRange({ from: undefined, to: undefined });
        return;
      }

      updateSelectedRange(date);
    };

  const handleFromChange = handleDateChange(setFromValue);
  const handleToChange = handleDateChange(setToValue);

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!range) return;
    store.setClassRange(range);
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
      <div className="relative flex h-7 w-full items-center rounded-md border border-solid border-gray-500 pl-[0.69rem] text-base text-gray-100">
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
          <div className="absolute left-4 top-3 z-10 flex h-auto -translate-x-4 translate-y-5 rounded-md border border-solid border-gray-500 bg-white px-3 py-4">
            <RangeCalendar
              mode="class"
              selectedRange={store.classRange}
              handleRangeSelect={handleRangeSelect}
            />
          </div>
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

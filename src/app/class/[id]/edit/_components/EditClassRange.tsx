import { format, isValid, parse } from 'date-fns';
import React, { useState, useRef, useEffect } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG } from '@/icons/svg';
import RangeCalendar from '@/components/Calendar/RangeCalendar';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

interface EditClassRangeProps {
  onChange: (value: { startDate: string; endDate: string }) => void;
  defaultValue?: { startDate: string; endDate: string };
}

const EditClassRange = ({
  onChange,
  defaultValue = { startDate: '', endDate: '' },
}: EditClassRangeProps) => {
  const [fromValue, setFromValue] = useState<string>(defaultValue.startDate);
  const [toValue, setToValue] = useState<string>(defaultValue.endDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    onChange({ startDate: fromValue, endDate: toValue });
  }, [fromValue, toValue]);

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleDateChange =
    (setDateValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = parse(e.target.value, 'y-MM-dd', new Date());
      if (isValid(date)) {
        setDateValue(e.target.value);
      }
    };

  const handleFromChange = handleDateChange(setFromValue);
  const handleToChange = handleDateChange(setToValue);

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!range) return;

    if (range.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };

  return (
    <div ref={ref}>
      <div className="relative flex h-7 w-full max-w-[20rem] items-center rounded-md border border-solid border-gray-500 pl-[0.69rem] text-base text-gray-100">
        <DateInput
          placeholder="시작 날짜"
          value={fromValue}
          onChange={handleFromChange}
          openCalendar={openCalendar}
          disabled={true}
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
              selectedRange={{
                from: new Date(fromValue),
                to: new Date(toValue),
              }}
              handleRangeSelect={handleRangeSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EditClassRange);

interface IDateInputProps {
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  openCalendar: () => void;
}

const DateInput = ({
  placeholder,
  value,
  onChange,
  openCalendar,
  disabled = false,
}: IDateInputProps) => (
  <input
    disabled={disabled}
    size={10}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onFocus={openCalendar}
    className={`px-1 ${disabled ? 'text-gray-500' : ''}`}
  />
);

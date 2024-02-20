import isValid from 'date-fns/isValid';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEventHandler, memo } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG } from '@/icons/svg';
import {
  formatDateWithHyphens,
  parseHyphenatedDate,
} from '@/utils/dateTimeUtils';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

const RangeCalendar = dynamic(
  () => import('@/components/Calendar/RangeCalendar'),
  {
    ssr: false,
  },
);

/* eslint-disable no-unused-vars */
interface EditClassRangeProps {
  onChange: (value: { startDate: string; endDate: string }) => void;
  defaultValue?: { startDate: string; endDate: string };
}

/* eslint-enable no-unused-vars */
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
  }, [fromValue, toValue, onChange]);

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleDateChange =
    (setDateValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = parseHyphenatedDate(e.target.value);

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
      setFromValue(formatDateWithHyphens(range.from));
    } else {
      setFromValue('');
    }
    if (range.to) {
      setToValue(formatDateWithHyphens(range.to));
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

export default memo(EditClassRange);

interface IDateInputProps {
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
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

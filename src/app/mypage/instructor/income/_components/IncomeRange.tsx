import { subMonths, isValid } from 'date-fns';
import { useState, useRef } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG } from '@/icons/svg';
import {
  formatDateWithHyphens,
  parseHyphenatedDate,
} from '@/utils/dateTimeUtils';
import RangeCalendar from '@/components/Calendar/RangeCalendar';

const IncomeRange = () => {
  const [fromValue, setFromValue] = useState<string | undefined>(undefined);
  const [toValue, setToValue] = useState<string | undefined>(undefined);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const ref = useRef(null);
  const classRange = {
    from: fromValue ? parseHyphenatedDate(fromValue) : undefined,
    to: toValue ? parseHyphenatedDate(toValue) : undefined,
  };

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!fromValue && !toValue && range?.from) {
      setFromValue(formatDateWithHyphens(range.from));
      setToValue(formatDateWithHyphens(range.from));
      return;
    }

    if (range?.from && isValid(range.from)) {
      setFromValue(formatDateWithHyphens(range.from));
    } else {
      setFromValue('');
    }

    if (range?.to && isValid(range.to)) {
      setToValue(formatDateWithHyphens(range.to));
    } else {
      setToValue('');
    }
  };

  const handleDuration = (months: number) => {
    const today = new Date();
    const startDate = subMonths(today, months);

    setFromValue(formatDateWithHyphens(startDate));
    setToValue(formatDateWithHyphens(today));
    setActiveButton(activeButton === months ? null : months);
  };
  // === 최대 조회 가능 기간이 있나..? ===
  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(event.target.value);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(event.target.value);
  };

  return (
    <div className="flex gap-3.5">
      <div ref={ref}>
        <div className="relative flex h-7 w-full max-w-[20rem] items-center rounded-md border border-solid border-gray-500 pl-2.5 text-base text-gray-100">
          <DateInput
            placeholder="시작 날짜"
            value={fromValue || ''}
            onChange={handleFromChange}
            openCalendar={openCalendar}
          />
          <span className="mx-1"> – </span>
          <DateInput
            placeholder="마지막 날짜"
            value={toValue || ''}
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
              mode="income"
              selectedRange={
                classRange.from && classRange.to ? classRange : undefined
              }
              handleRangeSelect={handleRangeSelect}
            />
          )}
        </div>
      </div>

      <div className="flex gap-4 text-sm font-medium">
        {[1, 3, 6].map((duration) => (
          <button
            key={duration}
            onClick={() => handleDuration(duration)}
            className={`flex h-7 w-[3.25rem] items-center justify-center rounded-md font-semibold ${
              activeButton === duration
                ? 'bg-sub-color1 text-white'
                : 'border border-solid border-gray-500 text-gray-500 hover:bg-sub-color1 hover:opacity-50'
            }`}
          >
            {duration}개월
          </button>
        ))}
      </div>
    </div>
  );
};

export default IncomeRange;

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

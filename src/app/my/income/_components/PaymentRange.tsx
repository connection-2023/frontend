import { format, isValid, parse } from 'date-fns';
import { useState, useRef } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG, MoneySVG, DoubleRightSVG } from '@/icons/svg';
import IncomeCalendar from '@/components/Calendar/IncomeCalendar';

const PaymentRange = () => {
  const [fromValue, setFromValue] = useState<string | undefined>('2023-09-04');
  const [toValue, setToValue] = useState<string | undefined>(undefined);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const ref = useRef(null);
  const classRange = {
    from: fromValue ? parse(fromValue, 'y-MM-dd', new Date()) : undefined,
    to: toValue ? parse(toValue, 'y-MM-dd', new Date()) : undefined,
  };

  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(event.target.value);
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!fromValue && !toValue && range?.from) {
      setToValue(format(range.from, 'y-MM-dd'));
    }

    if (range?.to && isValid(range.to)) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };
  return (
    <div className="flex justify-between gap-2 pb-4">
      <div className="flex w-full whitespace-nowrap">
        <div
          ref={ref}
          className="relative flex h-7 w-full max-w-[312px] items-center text-base text-sub-color3"
        >
          <input
            disabled
            value={fromValue || ''}
            className="max-w-[7.5rem] rounded-[0.31rem] border border-solid border-sub-color2 px-1 text-sub-color2"
          />

          <span className="mx-1"> – </span>
          <div className="flex w-fit items-center overflow-hidden rounded-[0.31rem] border border-solid border-sub-color2">
            <input
              placeholder="마지막 날짜"
              value={toValue || ''}
              onChange={handleToChange}
              onFocus={openCalendar}
              className="w-[7.5rem] px-1 focus:outline-none"
            />
            <span className="mr-2 flex w-full justify-end">
              <BasicCalendarSVG
                onClick={() => setIsCalendarVisible((prev) => !prev)}
                className="flex cursor-pointer fill-sub-color1"
              />
            </span>
            {isCalendarVisible && (
              <IncomeCalendar
                selectedRange={classRange}
                handleRangeSelect={handleRangeSelect}
              />
            )}
          </div>
        </div>

        <div className="flex">
          <button className="flex w-fit cursor-default items-center">
            <DoubleRightSVG />
          </button>

          <p className="flex items-center gap-3 text-sm font-semibold text-sub-color2">
            정산 받을 금액
            <span className="text-lg text-sub-color3">450,000원</span>
          </p>
        </div>
      </div>

      <button
        // --- 버튼 클릭 시 로직 추가 ---
        className="flex h-7 w-24 shrink-0 items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-main-color text-sm font-semibold text-white"
      >
        <MoneySVG width="18" height="18" fill="white" stroke="white" />
        정산신청
      </button>
    </div>
  );
};

export default PaymentRange;

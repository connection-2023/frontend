import { compareAsc } from 'date-fns';
import { useState, useMemo, useRef, useEffect } from 'react';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import DayOffCalendar from '@/components/Calendar/BasicCalendar';
import { formatDateWithDay } from '@/utils/dateTimeUtils';
import { getUniqueDates, calculateUnSelectedDate } from '@/utils/parseUtils';

/* eslint-disable no-unused-vars */
interface EditDayOffProps {
  schedules: Date[];
  holidays: string[];
  updateHolidays: (
    key: 'notification' | 'reservationComment' | 'holidays',
    value: string | Date[],
  ) => void;
}
/* eslint-enable no-unused-vars */
const EditDayOff = (props: EditDayOffProps) => {
  const { schedules, holidays, updateHolidays } = props;

  const parsedHolidays = useMemo(
    () => holidays.map((holiday) => new Date(holiday)),
    [holidays],
  );

  const allDays = useMemo(
    () => [...schedules, ...parsedHolidays],
    [schedules.length, parsedHolidays.length],
  );

  const initialUnselectedDates = useRef(parsedHolidays);
  const [unselectedDates, setUnselectedDates] =
    useState<Date[]>(parsedHolidays);

  useEffect(() => {
    initialUnselectedDates.current = parsedHolidays;
  }, [parsedHolidays.length]);

  const uniqueSelectableDates = useMemo(
    () => getUniqueDates(allDays),
    [allDays.length],
  );

  const uniqueScheduleDates = useMemo(
    () => getUniqueDates(schedules),
    [schedules.length],
  );

  const uniqueUnselectedDates = useMemo(
    () => getUniqueDates(unselectedDates),
    [unselectedDates.length],
  ).sort(compareAsc);

  const handleUnselected = (newselectedDates: Date[]) => {
    const newUnselectedDates = calculateUnSelectedDate(
      allDays,
      newselectedDates,
    );

    setUnselectedDates(newUnselectedDates);
  };

  const handleChangeCancel = () => {
    setUnselectedDates(initialUnselectedDates.current);
  };

  const handleUpdateHolidays = () => {
    if (unselectedDates) {
      updateHolidays('holidays', unselectedDates);
    }
  };

  return (
    <div className="mb-[1.38rem] grid w-full grid-cols-1 gap-7 border-t border-solid border-gray-700 py-4 md:grid-cols-[max-content_1fr] md:border-none md:py-0">
      <div className="h-fit justify-self-center rounded-lg px-3 py-2 lg:w-64 lg:shadow-horizontal">
        <DayOffCalendar
          mode="dayoff"
          selectableDates={uniqueSelectableDates}
          selectedDates={uniqueScheduleDates}
          handleSelected={handleUnselected}
        />
      </div>

      <div className="flex w-full flex-col border-t border-solid border-gray-700 pt-3 md:border-none">
        <p className="mb-3.5 text-sm font-semibold">선택한 휴무일</p>

        <ul className="flex min-h-[45px] w-fit flex-wrap gap-x-2 gap-y-3 overflow-y-auto text-sm font-medium text-gray-100">
          {uniqueUnselectedDates.map((date) => (
            <li
              key={date.toLocaleDateString()}
              className="h-fit rounded-md border border-solid border-gray-500 px-2.5 py-1.5"
            >
              {formatDateWithDay(date)}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full gap-2 whitespace-nowrap text-base text-sm font-semibold">
          <UniqueButton color="secondary" onClick={handleChangeCancel}>
            변경 취소
          </UniqueButton>
          <Button onClick={handleUpdateHolidays}>저장하기</Button>
        </div>
      </div>
    </div>
  );
};

export default EditDayOff;

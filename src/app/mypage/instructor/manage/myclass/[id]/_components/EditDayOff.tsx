import { format, isSameDay, compareAsc } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useState, useMemo, useRef, useEffect } from 'react';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import DayOffCalendar from '@/components/Calendar/BasicCalendar';
import { IClassSchedule } from '@/types/class';
import { getUniqueDates } from '@/utils/parseUtils';

interface EditDayOffProps {
  schedules: IClassSchedule[];
  holidays: string[];
  updateHolidays: (
    key: 'notification' | 'reservationComment' | 'holidays',
    value: string | Date[],
  ) => void;
}

const EditDayOff = ({
  schedules,
  holidays,
  updateHolidays,
}: EditDayOffProps) => {
  const parsedSchedules = useMemo(
    () => schedules.map((schedule) => new Date(schedule.startDateTime)),
    [schedules],
  );

  const parsedHolidays = useMemo(
    () => holidays.map((holiday) => new Date(holiday)),
    [holidays],
  );

  const allDays = useMemo(
    () => [...parsedSchedules, ...parsedHolidays],
    [parsedSchedules, parsedHolidays],
  );
  const initialUnselectedDates = useRef(parsedHolidays);
  const [unselectedDates, setUnselectedDates] =
    useState<Date[]>(parsedHolidays);

  useEffect(() => {
    initialUnselectedDates.current = parsedHolidays;
  }, [parsedHolidays]);

  const uniqueSelectableDates = useMemo(
    () => getUniqueDates(allDays),
    [allDays],
  );

  const uniqueScheduleDates = useMemo(
    () => getUniqueDates(parsedSchedules),
    [parsedSchedules],
  );

  const uniqueUnselectedDates = useMemo(
    () => getUniqueDates(unselectedDates),
    [unselectedDates],
  ).sort(compareAsc);

  if (!schedules || !holidays) return null;

  const handleUnselected = (unselectedDates: Date[]) => {
    const filteredunselectedDates = allDays.filter((schedule) =>
      unselectedDates.some((unselectedDate) =>
        isSameDay(schedule, unselectedDate),
      ),
    );

    setUnselectedDates(filteredunselectedDates);
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
      <div className="justify-self-center rounded-lg px-3 py-2 lg:w-64 lg:shadow-horizontal">
        <DayOffCalendar
          mode="dayoff"
          selectableDates={uniqueSelectableDates}
          selectedDates={uniqueScheduleDates}
          handleSelected={handleUnselected}
        />
      </div>

      <div className="flex w-full flex-col border-t border-solid border-gray-700 pt-3 md:border-none">
        <p className="mb-[0.87rem] text-sm font-semibold">선택한 휴무일</p>

        <ul className="flex min-h-[45px] w-fit flex-wrap gap-x-2 gap-y-3 overflow-y-auto text-sm font-medium text-gray-100">
          {uniqueUnselectedDates.map((date) => (
            <li
              key={date.toLocaleDateString()}
              className="h-fit rounded-[0.3125rem] border border-solid border-gray-500 px-[0.69rem] py-[0.31rem]"
            >
              {format(date, 'yy.MM.dd (E)', { locale: ko })}
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

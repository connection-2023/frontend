import { isSameDay, format, addMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  allClassDates,
  classDurationState,
} from '@/recoil/ClassSchedule/atoms';
import ScheduleCalendar from '@/components/Calendar/ScheduleCalendar';

const ScheduleView = () => {
  const classDates = useRecoilValue(allClassDates);
  const classTime = useRecoilValue(classDurationState);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

  useEffect(() => {
    if (!classDates || !classTime || classDates.length === 0)
      setSelectedDate([]);
  }, [classDates]);

  const handleClickDate = useCallback(
    (selectedDate: Date) => {
      if (!classTime) return;

      const formattedDates = classDates
        .filter((date) => isSameDay(date, selectedDate))
        .map((date) => {
          const endDate = addMinutes(date, classTime);
          return `${format(date, 'MM.dd(E)', { locale: ko })} ${format(
            date,
            'hh:mm a',
          )} ~ ${format(endDate, 'hh:mm a')}`;
        });

      setSelectedDate(formattedDates);
    },
    [classTime, classDates],
  );

  return (
    <div className="flex w-full justify-between whitespace-nowrap">
      {classDates && (
        <>
          <ScheduleCalendar
            clickableDates={classDates}
            handleClickDate={handleClickDate}
          />

          <ul className="flex flex-col gap-[0.37rem] pl-3">
            {selectedDate.map((date) => (
              <li
                key={date}
                className="flex h-[2.8125rem] items-center justify-between rounded-[0.31rem] border
        border-solid border-[#D8D8D8] px-10 text-sm font-medium"
              >
                {date}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default React.memo(ScheduleView);

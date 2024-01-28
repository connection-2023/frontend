'use client';
import dynamic from 'next/dynamic';
import { useState, memo } from 'react';
import ScheduleCalendar from '../Calendar/SingleCalendar';
import { IClassSchedule } from '@/types/class';

const FormatCreateSchedule = dynamic(() => import('./FormatCreateSchedule'), {
  ssr: false,
});

const FormatSchedule = dynamic(() => import('./FormatSchedule'), {
  ssr: false,
});

interface ScheduleViewProps {
  lectureSchedule: IClassSchedule[] | Date[];
  maxCapacity: number;
  duration: number;
}

const ScheduleView = ({
  lectureSchedule,
  maxCapacity,
  duration,
}: ScheduleViewProps) => {
  const [clickDate, setClickDate] = useState<Date | undefined>(undefined);
  const clickableDates = lectureSchedule.map((schedule) =>
    schedule instanceof Date ? schedule : new Date(schedule.startDateTime),
  );

  if (!clickableDates.length) return null;

  const handleClickDate = (newDate: Date | undefined) => {
    setClickDate(newDate);
  };

  return (
    <div className="flex w-full flex-col whitespace-nowrap md:flex-row md:justify-between">
      <div className="flex w-full justify-center md:w-fit md:justify-start">
        <ScheduleCalendar
          mode="schedule"
          clickableDates={clickableDates}
          handleClickDate={handleClickDate}
        />
      </div>

      <ul className="flex w-full flex-col items-center gap-[0.37rem] overflow-y-auto pl-3">
        {lectureSchedule.length > 0 && lectureSchedule[0] instanceof Date
          ? (lectureSchedule as Date[]).map((date, index) => (
              <FormatCreateSchedule
                key={index}
                clickDate={clickDate}
                duration={duration}
                schedule={date}
              />
            ))
          : (lectureSchedule as IClassSchedule[]).map((schedule, index) => (
              <FormatSchedule
                key={index}
                clickDate={clickDate}
                duration={duration}
                schedule={schedule}
                maxCapacity={maxCapacity}
              />
            ))}
      </ul>
    </div>
  );
};

export default memo(ScheduleView);

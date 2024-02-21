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
    <div className="grid w-full grid-cols-[max_content] place-items-center gap-x-20 whitespace-nowrap md:auto-cols-min md:grid-flow-col-dense md:place-items-stretch">
      <div className="flex w-fit justify-center md:w-fit md:justify-start">
        <ScheduleCalendar
          mode="schedule"
          clickableDates={clickableDates}
          handleClickDate={handleClickDate}
        />
      </div>

      <ul className="flex flex-col items-center gap-2.5 overflow-y-auto md:w-72">
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

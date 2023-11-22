'use client';
import { isSameDay } from 'date-fns';
import { useState, memo } from 'react';
import { formatDateTime } from '@/utils/parseUtils';
import ScheduleCalendar from '../Calendar/SingleCalendar';
import { IClassSchedule } from '@/types/class';

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
          ? (lectureSchedule as Date[]).map((date, index) => {
              return (
                <FormatCreateSchedule
                  key={index}
                  clickDate={clickDate}
                  duration={duration}
                  schedule={date}
                />
              );
            })
          : (lectureSchedule as IClassSchedule[]).map((schedule, index) => {
              if (
                !clickDate ||
                !isSameDay(clickDate, new Date(schedule.startDateTime))
              ) {
                return null;
              }
              return (
                <FormatSchedule
                  key={index}
                  clickDate={clickDate}
                  duration={duration}
                  schedule={schedule}
                  maxCapacity={maxCapacity}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default memo(ScheduleView);

const textStyle = {
  normal: 'text-gray-100',
  full: 'text-gray-300',
};

interface IFormatSchedule {
  clickDate: Date | undefined;
  duration: number;
  schedule: IClassSchedule;
  maxCapacity: number;
}
const FormatSchedule = ({
  clickDate,
  duration,
  schedule,
  maxCapacity,
}: IFormatSchedule) => {
  const scheduleDate = new Date(schedule.startDateTime);
  const formattedDateTime = formatDateTime(scheduleDate, duration);
  const mode =
    schedule.numberOfParticipants === maxCapacity ? 'full' : 'normal';
  return (
    <li
      key={schedule.id}
      className={`border-box flex h-[2.8125rem] w-full items-center justify-between rounded-md border border-solid
    border-gray-700 px-6 md:max-w-[16.8125rem] ${textStyle[mode]} text-sm font-medium`}
    >
      <p>{formattedDateTime}</p>
      <p>
        {mode === 'normal'
          ? `(${schedule.numberOfParticipants}/${maxCapacity}명)`
          : '(인원마감)'}
      </p>
    </li>
  );
};

interface IFormatCreateSchedule {
  clickDate: Date | undefined;
  duration: number;
  schedule: Date;
}
const FormatCreateSchedule = ({
  clickDate,
  duration,
  schedule,
}: IFormatCreateSchedule) => {
  if (!clickDate || !isSameDay(clickDate, schedule)) {
    return null;
  }
  const formattedDateTime = formatDateTime(schedule, duration);

  return (
    <li
      key={schedule.toDateString()}
      className={`border-box flex h-[2.8125rem] w-full items-center justify-between rounded-md border border-solid
    border-gray-700 px-6 text-sm font-medium md:max-w-[16.8125rem]`}
    >
      <p>{formattedDateTime}</p>
    </li>
  );
};

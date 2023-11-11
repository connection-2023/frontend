'use client';
import { isSameDay } from 'date-fns';
import React, { useState } from 'react';
import { formatDateTime } from '@/utils/parseUtils';
import ScheduleCalendar from '../Calendar/SingleCalendar';
import { IClassSchedule } from '@/types/class';

interface ISchedule {
  id: number;
  lectureId: number;
  startDateTime: string;
  numberOfParticipants: number;
  team: null | string;
}

interface ScheduleViewProps {
  lectureSchedule: IClassSchedule[];
  maxCapacity: number;
  duration: number;
}

const ScheduleView = ({
  lectureSchedule,
  maxCapacity,
  duration,
}: ScheduleViewProps) => {
  const [clickDate, setClickDate] = useState<Date | undefined>(undefined);

  const handleClickDate = (newDate: Date) => {
    setClickDate(newDate);
  };

  const clickableDates = lectureSchedule.map(
    (date) => new Date(date.startDateTime),
  );
  if (!clickableDates.length) return null;

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
        {lectureSchedule.map((schedule) => {
          return formatSchedule(clickDate, duration, schedule, maxCapacity);
        })}
      </ul>
    </div>
  );
};

export default React.memo(ScheduleView);

const textStyle = {
  normal: 'text-gray-100',
  full: 'text-gray-300',
};

const formatSchedule = (
  clickDate: Date | undefined,
  duration: number,
  schedule: IClassSchedule,
  maxCapacity: number,
) => {
  const scheduleDate = new Date(schedule.startDateTime);
  if (!clickDate || !isSameDay(clickDate, scheduleDate)) return;

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

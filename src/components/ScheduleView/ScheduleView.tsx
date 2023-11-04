'use client';
import { format, parseISO, isSameDay, addMinutes } from 'date-fns';
import ko from 'date-fns/locale/ko';
import React, { useState } from 'react';
import ScheduleCalendar from '../Calendar/ScheduleCalendar';

const textStyle = {
  normal: 'text-sub-color3',
  full: 'text-sub-color2',
};

interface ISchedule {
  id: number;
  lectureId: number;
  startDateTime: string;
  numberOfParticipants: number;
  team: null | string;
}

interface ScheduleViewProps {
  lectureSchedule: ISchedule[];
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

const formatSchedule = (
  clickDate: Date | undefined,
  duration: number,
  schedule: ISchedule,
  maxCapacity: number,
) => {
  if (!clickDate || !isSameDay(clickDate, new Date(schedule.startDateTime)))
    return;

  const date = parseISO(schedule.startDateTime);
  const endDate = addMinutes(date, duration);
  const formattedStartDate = format(date, 'MM.dd (E) HH:mm', { locale: ko });
  const formattedEndDate = format(endDate, 'HH:mm', { locale: ko });

  return (
    <ScheduleList
      key={schedule.id}
      dateTime={`${formattedStartDate} - ${formattedEndDate}`}
      current={schedule.numberOfParticipants}
      total={maxCapacity}
    />
  );
};
interface IScheduleListProps {
  dateTime: string;

  current: number;
  total: number;
}

const ScheduleList = ({ dateTime, current, total }: IScheduleListProps) => {
  const mode = current === total ? 'full' : 'normal';

  return (
    <li
      className={`border-box flex h-[2.8125rem] w-full items-center justify-between rounded-[0.31rem] border border-solid
    border-[#D8D8D8] px-[1.62rem] md:max-w-[16.8125rem] ${textStyle[mode]} text-sm font-medium`}
    >
      <p>{dateTime}</p>
      <p>{mode === 'normal' ? `(${current}/${total}명)` : '(인원마감)'}</p>
    </li>
  );
};

'use client';
import { useState, memo } from 'react';
import { BasicCalendarSVG } from '@/icons/svg';
import {
  getDatesFromSchedules,
  getRegularScheduleTime,
} from '@/utils/scheduleDateUtils';
import ScheduleCalendar from '../Calendar/BasicCalendar';
import { IRegularClassSchedule } from '@/types/class';

interface ScheduleViewProps {
  lectureSchedule: IRegularClassSchedule[];
  maxCapacity: number;
  duration: number;
}

const RegularScheduleView = ({
  lectureSchedule,
  maxCapacity,
  duration,
}: ScheduleViewProps) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<IRegularClassSchedule>();
  const [selectedDates, setSelectedDates] = useState<Date[]>();

  const clickableDates = getDatesFromSchedules(lectureSchedule);
  if (!clickableDates?.length) return null;

  const handleClickSchedule = (newSchedule: IRegularClassSchedule) => {
    if (selectedSchedule?.id === newSchedule.id) return;
    setSelectedSchedule(newSchedule);

    const clickedDates = newSchedule.regularLectureSchedule.map(
      (schedule) => new Date(schedule.startDateTime),
    );

    setSelectedDates(clickedDates);
  };

  return (
    <div className="grid w-full grid-cols-[max_content] place-items-center gap-x-10 whitespace-nowrap md:grid-flow-col-dense md:place-items-stretch">
      <ul className="flex w-full flex-col items-center gap-2.5 overflow-y-auto md:w-[300px]">
        {lectureSchedule.map((schedule) => (
          <ScheduleList
            key={schedule.id}
            {...schedule}
            maxCapacity={maxCapacity}
            duration={duration}
            selectedSchedule={selectedSchedule}
            handleClickSchedule={handleClickSchedule}
          />
        ))}
      </ul>

      <div className="flex w-fit justify-center rounded-lg px-4 py-6 md:w-fit md:justify-start md:shadow-horizontal">
        <ScheduleCalendar mode="preview" selectedDates={selectedDates} />
      </div>
    </div>
  );
};

export default memo(RegularScheduleView);

const textStyle = {
  normal: 'text-gray-100',
  full: 'text-gray-300',
};
interface ScheduleListProps extends IRegularClassSchedule {
  maxCapacity: number;
  duration: number;
  selectedSchedule?: IRegularClassSchedule;
  // eslint-disable-next-line no-unused-vars
  handleClickSchedule: (newSchedule: IRegularClassSchedule) => void;
}

const ScheduleList = (props: ScheduleListProps) => {
  const {
    id,
    day,
    dateTime,
    numberOfParticipants,
    regularLectureSchedule,
    maxCapacity,
    duration,
    selectedSchedule,
    handleClickSchedule,
  } = props;
  const days = day.join(',');
  const scheduleTime = getRegularScheduleTime(dateTime, duration);
  const mode = numberOfParticipants === maxCapacity ? 'full' : 'normal';
  const isSelected = selectedSchedule?.id === id;

  const liStyle = (() => {
    const baseClass =
      'border-box flex h-[2.8125rem] w-full cursor-pointer items-center justify-between rounded-md px-6 text-sm font-medium shadow-float';
    const borderClass = isSelected
      ? 'border-2 border-solid border-sub-color1'
      : 'border border-solid border-gray-700';
    const textClass = textStyle[mode];

    return `${baseClass} ${borderClass} ${textClass}`;
  })();

  return (
    <li
      onClick={() =>
        handleClickSchedule({
          id,
          day,
          dateTime,
          numberOfParticipants,
          regularLectureSchedule,
        })
      }
      className={liStyle}
    >
      <p className="flex items-center">
        <BasicCalendarSVG
          width="21"
          height="21"
          className="mr-2 fill-sub-color1"
        />
        {`${days} ${dateTime}-${scheduleTime}`}
      </p>
      <p>
        {mode === 'normal'
          ? `(${numberOfParticipants}/${maxCapacity}명)`
          : '(인원마감)'}
      </p>
    </li>
  );
};

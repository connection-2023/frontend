'use client';
import isSameDay from 'date-fns/isSameDay';
import { useState, useEffect, useMemo } from 'react';
import { TimeSVG } from '@/icons/svg';
import { usePaymentStore } from '@/store';
import { formatTimeNoSec } from '@/utils/dateTimeUtils';
import { formatDateTime } from '@/utils/parseUtils';
import ReservationItem from '@/components/Apply/ReservationItem';
import ScheduleCalendar from '@/components/Calendar/SingleCalendar';
import { IClassSchedule, IDateTime } from '@/types/class';

interface IClassApplicationInfoProps {
  lectureScheduleId: string;
  lectureSchedule: IClassSchedule[];
  clickableDates: Date[];
  findSelectedSchedule?: IClassSchedule;
  maxCapacity: number;
  duration: number;
  applyCount: number;
  initialClickDate?: Date;
}

const ClassApplicationInfo = ({
  lectureScheduleId,
  lectureSchedule,
  clickableDates,
  findSelectedSchedule,
  maxCapacity,
  duration,
  applyCount,
  initialClickDate,
}: IClassApplicationInfoProps) => {
  const initialSelectedSchedule = findSelectedSchedule
    ? {
        count: applyCount,
        dateTime: findSelectedSchedule.startDateTime,
        lectureId: findSelectedSchedule.lectureId,
        lectureScheduleId: findSelectedSchedule.id,
        space: {
          current: findSelectedSchedule.numberOfParticipants,
          total: maxCapacity,
        },
      }
    : null;

  const [clickDate, setClickDate] = useState<Date | undefined>(
    initialClickDate,
  );
  const [selectedSchedule, setSelectedSchedule] = useState<IDateTime | null>(
    initialSelectedSchedule,
  );

  const setApplyClass = usePaymentStore((state) => state.setApplyClass);

  useEffect(() => {
    if (findSelectedSchedule) {
      const reservation = {
        lectureScheduleId: Number(lectureScheduleId),
        participants: applyCount,
      };

      setApplyClass(reservation);
    }
  }, []);

  const timeList = useMemo(() => {
    if (!clickDate) {
      return [];
    }

    return lectureSchedule.filter((schedule) =>
      isSameDay(new Date(schedule.startDateTime), clickDate),
    );
  }, [clickDate, lectureSchedule]);

  if (!clickableDates.length) return null;

  const handleTimeList = (newTimeList: IClassSchedule) => {
    const schedule = {
      count: 1,
      dateTime: newTimeList.startDateTime,
      lectureId: newTimeList.lectureId,
      lectureScheduleId: newTimeList.id,
      space: {
        current: newTimeList.numberOfParticipants,
        total: maxCapacity,
      },
    };
    setSelectedSchedule(schedule);
  };

  const updateParticipants = (newCount: number) => {
    if (selectedSchedule) {
      const newSchedule = {
        ...selectedSchedule,
        count: newCount,
      };
      setSelectedSchedule(newSchedule);

      setApplyClass({
        lectureScheduleId: newSchedule.lectureScheduleId,
        participants: newSchedule.count,
      });
    }
  };

  const removeReservationItem = () => {
    setSelectedSchedule(null);
    setClickDate(undefined);
  };

  const handleClickDate = (newDate: Date | undefined) => {
    setClickDate(newDate);
  };

  const timeListStyle = (scheduleId: number) =>
    selectedSchedule?.lectureScheduleId === scheduleId
      ? 'border-main-color font-bold text-main-color'
      : 'border-gray-500';

  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2">
      <div className="w-fit justify-self-center">
        <ScheduleCalendar
          mode="schedule"
          clickableDates={clickableDates}
          handleClickDate={handleClickDate}
          initialSelected={clickDate}
          defaultMonth={clickDate}
        />
      </div>

      <div className="flex flex-col md:max-w-[288px]">
        <p className="flex items-center gap-x-1.5 text-sm font-medium">
          <TimeSVG className="fill-black" /> {duration}분 수업
        </p>

        <ul className="mb-auto mt-3 grid h-28 grid-cols-2 gap-x-3.5 gap-y-2 overflow-y-auto whitespace-nowrap pr-5">
          {timeList.map((list) => (
            <li key={list.id} onClick={() => handleTimeList(list)}>
              <button
                className={`flex h-9 w-full items-center justify-between rounded-md border border-solid md:w-[120px] ${timeListStyle(
                  list.id,
                )} px-2 text-sm`}
              >
                <span>{formatTimeNoSec(list.startDateTime)}</span>
                <span>{`(${list.numberOfParticipants}/${maxCapacity}명)`}</span>
              </button>
            </li>
          ))}
        </ul>

        {selectedSchedule && (
          <ReservationItem
            key={selectedSchedule.lectureScheduleId}
            lectureScheduleId={selectedSchedule.lectureScheduleId}
            dateTime={formatDateTime(
              new Date(selectedSchedule.dateTime),
              duration,
            )}
            space={selectedSchedule.space}
            count={selectedSchedule.count}
            onRemove={removeReservationItem}
            countUpdate={updateParticipants}
            borderColor="border-gray-500"
          />
        )}
      </div>
    </div>
  );
};

export default ClassApplicationInfo;

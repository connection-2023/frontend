'use client';
import isSameDay from 'date-fns/isSameDay';
import { useState, useEffect, useMemo } from 'react';
import ReservationItem from '../../_components/apply/ReservationItem';
import ScheduleCalendar from '@/components/Calendar/SingleCalendar';
import { IClassSchedule, IDateTime } from '@/types/class';
import { TimeSVG } from '@/icons/svg';
import { usePaymentStore } from '@/store';
import { formatTimeNoSec } from '@/utils/dateTimeUtils';
import { formatDateTime } from '@/utils/parseUtils';

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

  if (!clickableDates.length) return null;

  const timeList = useMemo(() => {
    if (!clickDate) {
      return [];
    }

    return lectureSchedule.filter((schedule) =>
      isSameDay(new Date(schedule.startDateTime), clickDate),
    );
  }, [clickDate, lectureSchedule]);

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
    <section className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
      <h3 className="text-lg font-semibold">신청한 클래스</h3>

      <div className="mt-2 grid grid-cols-2">
        <div className="flex w-fit justify-center md:w-fit md:justify-start">
          <ScheduleCalendar
            mode="schedule"
            clickableDates={clickableDates}
            handleClickDate={handleClickDate}
            initialSelected={clickDate}
            defaultMonth={clickDate}
          />
        </div>

        <div className="flex max-w-[288px] flex-col">
          <p className="flex items-center gap-x-1.5 text-sm font-medium">
            <TimeSVG className="fill-black" /> {duration}분 수업
          </p>

          <ul className="mb-auto mt-3 grid h-28 grid-cols-2 gap-x-3.5 gap-y-2 overflow-y-auto whitespace-nowrap pr-5">
            {timeList.map((list) => (
              <li key={list.id} onClick={() => handleTimeList(list)}>
                <button
                  className={`flex h-9 w-[120px] items-center justify-between rounded-md border border-solid ${timeListStyle(
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
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassApplicationInfo;

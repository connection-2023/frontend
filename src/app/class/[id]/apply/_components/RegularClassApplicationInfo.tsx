'use client';
import { useState, useEffect, useMemo } from 'react';
import { BasicCalendarSVG, TimeSVG } from '@/icons/svg';
import { usePaymentStore } from '@/store';
import { getRegularScheduleTime } from '@/utils/scheduleDateUtils';
import RegularApplyList from '../../_components/apply/RegularApplyList';
import ReservationItem from '../../_components/apply/ReservationItem';
import { IRegularClassSchedule, ISelectedSchedule } from '@/types/class';

interface RegularClassApplicationInfoProps {
  schedule: IRegularClassSchedule[];
  initSelectedSchedule: IRegularClassSchedule;
  duration: number;
  maxCapacity: number;
  range: string;
}

const RegularClassApplicationInfo = (
  props: RegularClassApplicationInfoProps,
) => {
  const { schedule, duration, range, maxCapacity, initSelectedSchedule } =
    props;
  const [selectedSchedule, setSelectedSchedule] = useState<ISelectedSchedule>({
    ...initSelectedSchedule,
    count: 1,
  });
  const { setApplyClass } = usePaymentStore();

  const formatedDateTime = useMemo(() => {
    if (selectedSchedule) {
      return {
        lectureScheduleId: selectedSchedule.id,
        dateTime: `${selectedSchedule.day.join(',')} ${
          selectedSchedule.dateTime
        }-${getRegularScheduleTime(selectedSchedule.dateTime, duration)}`,
        space: {
          total: maxCapacity,
          current: selectedSchedule.numberOfParticipants,
        },
        count: selectedSchedule?.count || 1,
      };
    }
  }, [selectedSchedule?.id, selectedSchedule?.count]);

  useEffect(() => {
    if (selectedSchedule) {
      const reservation = {
        lectureScheduleId: Number(selectedSchedule.id),
        participants: selectedSchedule.count,
      };

      setApplyClass(reservation);
    }
  }, [selectedSchedule?.id, selectedSchedule?.count]);

  const onSelect = (newValue: IRegularClassSchedule) => {
    if (newValue) {
      setSelectedSchedule({ ...newValue, count: 1 });
    }
  };

  const updateParticipants = (newCount: number) => {
    if (selectedSchedule) {
      setSelectedSchedule({ ...selectedSchedule, count: newCount });
    }
  };

  return (
    <div className="mt-3 space-y-3">
      <div className="mb-1 flex gap-x-3">
        <span className="flex items-center">
          <BasicCalendarSVG
            width="21"
            height="21"
            className="mr-2 fill-gray-100"
          />
          {range}
        </span>

        <span className="flex items-center">
          <TimeSVG className="mr-2 fill-gray-100" /> {duration}분 수업
        </span>
      </div>

      <RegularApplyList
        isApply={true}
        schedule={schedule}
        duration={duration}
        maxCapacity={maxCapacity}
        selectedSchedule={selectedSchedule}
        onSelect={onSelect}
      />

      {selectedSchedule && formatedDateTime && (
        <ReservationItem
          key={formatedDateTime.lectureScheduleId}
          lectureScheduleId={formatedDateTime.lectureScheduleId}
          dateTime={formatedDateTime.dateTime}
          space={formatedDateTime.space}
          count={formatedDateTime.count}
          countUpdate={updateParticipants}
          borderColor="border-gray-500"
        />
      )}
    </div>
  );
};

export default RegularClassApplicationInfo;

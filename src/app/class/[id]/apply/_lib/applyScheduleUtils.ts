import { formatDateTime } from '@/utils/parseUtils';
import { IClassSchedule } from '@/types/class';
import { IReservationInfo } from '@/types/payment';

// 선택된 강의 일정 처리 함수
export const processSelectedSchedules = (
  schedule: IClassSchedule[],
  initialApplyData: IReservationInfo,
  maxCapacity: number,
  duration: number,
) => {
  const selectedSchedule = schedule.find(
    (item) => item.id === Number(initialApplyData.lectureScheduleId),
  );

  if (!selectedSchedule) return;

  const datetime = new Date(selectedSchedule.startDateTime);
  const remain = maxCapacity - selectedSchedule.numberOfParticipants;

  return {
    lectureScheduleId: selectedSchedule.id,
    dateTime: formatDateTime(datetime, duration),
    remain,
    participants: Number(initialApplyData.participants),
  };
};

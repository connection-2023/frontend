import { parseISO } from 'date-fns';
import { formatDateTime } from '@/utils/parseUtils';
import { IClassSchedule } from '@/types/class';

interface IApplyQuery {
  lectureScheduleId: number;
  participants: number;
}

export const parseApplyQuery = (count: string | string[]) => {
  const countArray = Array.isArray(count) ? count : [count];
  return countArray.reduce<{
    data: Array<IApplyQuery>;
    ids: number[];
  }>(
    (acc, item) => {
      const [lectureScheduleId, participants] = item.split('-').map(Number);
      acc.data.push({
        lectureScheduleId,
        participants,
      });
      acc.ids.push(lectureScheduleId);
      return acc;
    },
    { data: [], ids: [] },
  );
};

// 선택된 강의 일정 처리 함수
export const processSelectedSchedules = (
  selectedSchedule: IClassSchedule[],
  initialApplyData: IApplyQuery[],
  maxCapacity: number,
  duration: number,
) => {
  return selectedSchedule.map((lecture) => {
    const datetime = parseISO(lecture.startDateTime);
    const remain = maxCapacity - lecture.numberOfParticipants;
    const matchedSchedule = initialApplyData.find(
      (item) => item.lectureScheduleId === lecture.id,
    );
    const participants = matchedSchedule ? matchedSchedule.participants : 0;

    return {
      lectureScheduleId: lecture.id,
      dateTime: formatDateTime(datetime, duration),
      remain,
      participants,
    };
  });
};

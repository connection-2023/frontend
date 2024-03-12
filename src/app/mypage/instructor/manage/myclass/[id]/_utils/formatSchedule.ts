import { isPast, isFuture } from 'date-fns';
import {
  IProcessedSchedules,
  IClassSchedule,
  IRegularSchedule,
} from '@/types/class';

export const filterSchedulesByDate = (
  showPastClasses: boolean,
  schedules: IProcessedSchedules[],
) => {
  if (showPastClasses) return schedules;

  return schedules.filter((item) => isFuture(item.date));
};

export const findFirstFutureScheduleIndex = (
  schedules: IProcessedSchedules[],
) => {
  return schedules.findIndex((item) => isFuture(item.date));
};

export const processedScheduleData = (
  schedules: IClassSchedule[] | IRegularSchedule[],
) => {
  return schedules?.map((schedule, idx) => {
    const date = new Date(schedule.startDateTime);

    return {
      ...schedule,
      index: idx + 1,
      date,
      isPastClass: isPast(date),
    };
  });
};

import { isFuture } from 'date-fns';
import { IProcessedSchedules } from '@/types/class';

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

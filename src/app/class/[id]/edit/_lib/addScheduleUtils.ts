import isSameDay from 'date-fns/isSameDay';
import { generateDatesFromNewEndDate } from '@/utils/parseUtils';
import { IDaySchedule } from '@/types/class';

export const filteredAddedSchedules = (
  originSchedule: Date[],
  newSchedules: Date[],
  daySchedule: IDaySchedule[],
  newEndDate: string,
  newRange: { startDate: string; endDate: string },
) => {
  const originDates = originSchedule.map((date) => date.toISOString());
  const newValDates = newSchedules.reduce((acc: string[], date) => {
    if (date !== null) {
      acc.push(date.toISOString());
    }
    return acc;
  }, []);

  const differenceSchedules = newValDates
    .filter((date) => !originDates.includes(date))
    .map((date) => new Date(date));

  return daySchedule
    ? newEndDate && isSameDay(new Date(newRange.endDate), new Date(newEndDate))
      ? {}
      : {
          schedules: generateDatesFromNewEndDate(
            newRange.endDate,
            newEndDate,
            daySchedule,
          ),
        }
    : { schedules: differenceSchedules };
};

import isBefore from 'date-fns/isBefore';
import { formatDateWithDay, formatTimeNoSec } from '@/utils/dateTimeUtils';
import { IRegularSchedule } from '@/types/class';

export const formatSchedule = (schedule: IRegularSchedule[]) => {
  const today = new Date();

  return schedule.map((item) => ({
    date: formatDateWithDay(item.startDateTime),
    time: `${formatTimeNoSec(item.startDateTime)}-${formatTimeNoSec(
      item.endDateTime,
    )}`,
    isbefore: isBefore(new Date(item.startDateTime), today),
  }));
};

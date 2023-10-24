import { DateRange } from 'react-day-picker';
import { atom } from 'recoil';

export const classRangeState = atom<DateRange | undefined>({
  key: 'classRanges',
  default: undefined,
});

export const classDurationState = atom<number | null>({
  key: 'classDuration',
  default: null,
});

export const allClassDates = atom<Date[]>({
  key: 'allClassDates',
  default: [],
});

export const classDayTypeState = atom<string>({
  key: 'classDayType',
  default: '',
});

export const classScheduleState = atom<Date[]>({
  key: 'classSchedule',
  default: [],
});

export const classHolidayState = atom<Date[] | null>({
  key: 'classHoilday',
  default: null,
});

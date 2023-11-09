import {
  format,
  addMinutes,
  parseISO,
  compareAsc,
  isAfter,
  isEqual,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { IGenre, IRegion } from '@/types/types';
import { IClassSchedule } from '@/types/class';

// 서울 특별시 -> 서울 충청북도 -> 충북
export const formatLocationToString = (
  regions: { region: IRegion }[] | IRegion[],
) =>
  regions
    .map((region) => {
      const isIRegion = 'administrativeDistrict' in region;

      const targetRegion = isIRegion ? region : region.region;
      const { administrativeDistrict, district } = targetRegion;

      return `${administrativeDistrict} ${district || ''}`;
    })
    .join(', ');

export const formatGenreToString = (genres: IGenre[]) =>
  genres
    .map((genre) => {
      if (genre.name) return genre.name;
      else {
        return genre.danceCategory.genre;
      }
    })
    .join(', ');

export const formatDateTime = (datetime: Date, duration: number) => {
  const endDatetime = addMinutes(datetime, duration);
  const formattedStartDatetime = format(datetime, 'M월 d일 (eee) HH:mm', {
    locale: ko,
  });
  const formattedEndDatetime = format(endDatetime, 'HH:mm');
  return `${formattedStartDatetime}-${formattedEndDatetime}`;
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'MM/dd');
};

export const applyScheduleFilter = (
  schedule: IClassSchedule[],
  maxCapacity: number,
) => {
  const today = new Date();

  const sortDates = (a: IClassSchedule, b: IClassSchedule) => {
    const aStartDateTime = parseISO(a.startDateTime);
    const bStartDateTime = parseISO(b.startDateTime);
    return compareAsc(aStartDateTime, bStartDateTime);
  };

  const filteredAndSortedSchedule = schedule
    .filter((item) => {
      const itemDate = parseISO(item.startDateTime);
      return isAfter(itemDate, today) || isEqual(itemDate, today);
    })
    .sort(sortDates);

  const spaceFull = filteredAndSortedSchedule.filter(
    (space) => space.numberOfParticipants === maxCapacity,
  );
  const spaceNotFull = filteredAndSortedSchedule.filter(
    (space) => space.numberOfParticipants !== maxCapacity,
  );

  return [...spaceNotFull, ...spaceFull];
};

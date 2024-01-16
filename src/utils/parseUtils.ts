import {
  format,
  addMinutes,
  parseISO,
  compareAsc,
  isAfter,
  isEqual,
  eachDayOfInterval,
  set,
  getDay,
  isSameDay,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { IGenre, IRegion } from '@/types/types';
import {
  IClassSchedule,
  DayTimeList,
  DateTimeList,
  IDaySchedule,
} from '@/types/class';

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

export const getUniqueDates = (dates: Date[]) =>
  dates.filter(
    (date, index, self) => index === self.findIndex((d) => isSameDay(date, d)),
  );

export const calculateFinalDates = (
  startDate: string,
  endDate: string,
  schedules: DayTimeList[] | DateTimeList[],
  holidays: {
    holiday: string;
  }[],
) => {
  const dayMapping: {
    [key in '일' | '월' | '화' | '수' | '목' | '금' | '토']: number;
  } = { 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6 };

  let allDates = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const holidayDates = holidays.map((holiday) => parseISO(holiday.holiday));

  allDates = allDates.filter(
    (date) => !holidayDates.some((holidayDate) => isSameDay(date, holidayDate)),
  );

  if (schedules.length === 0) return [];

  if ('day' in schedules[0]) {
    const dayTimeSchedules = schedules as DayTimeList[];

    return dayTimeSchedules.reduce((acc: Date[], schedule) => {
      const days = schedule.day.map((dayStr) => dayMapping[dayStr]);

      schedule.startDateTime.forEach((time) => {
        const [hourStr, minuteStr] = time.split(':');

        allDates.forEach((date) => {
          const day = getDay(date);

          if (days.includes(day)) {
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);
            const newDate = set(date, { hours: hour, minutes: minute });

            acc.push(newDate);
          }
        });
      });

      return acc;
    }, []);
  } else {
    const dateTimeSchedules = schedules as DateTimeList[];

    return dateTimeSchedules.reduce((acc: Date[], schedule) => {
      schedule.startDateTime.forEach((time) => {
        const [hourStr, minuteStr] = time.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const newDate = set(schedule.date, { hours: hour, minutes: minute });

        acc.push(newDate);
      });

      return acc;
    }, []);
  }
};

export const formatScheduleDays = (
  daySchedule: IDaySchedule[],
  duration: number,
) => {
  return daySchedule.map((schedule) => {
    const days = schedule.day.join(',');
    const times = schedule.dateTime
      .map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hour, minute);
        const endTime = addMinutes(startTime, duration);

        return `${time}-${format(endTime, 'HH:mm')}`;
      })
      .join(', ');

    return `${days} ${times}`;
  });
};

export const generateDatesFromNewEndDate = (
  startDate: string,
  endDate: string,
  schedules: IDaySchedule[],
) => {
  const dayMapping: {
    [key in '일' | '월' | '화' | '수' | '목' | '금' | '토']: number;
  } = { 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6 };

  let allDates = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  if (schedules.length === 0) return [];

  return schedules.reduce((acc: Date[], schedule) => {
    const days = schedule.day.map((dayStr) => dayMapping[dayStr]);

    schedule.dateTime.forEach((time) => {
      const [hourStr, minuteStr] = time.split(':');

      allDates.forEach((date) => {
        const day = getDay(date);

        if (days.includes(day)) {
          const hour = parseInt(hourStr, 10);
          const minute = parseInt(minuteStr, 10);
          const newDate = set(date, { hours: hour, minutes: minute });

          acc.push(newDate);
        }
      });
    });

    return acc;
  }, []);
};

export const calculateEndTime = (start: string, duration: number) => {
  if (!start || start.trim() === '') {
    return '--:-- --';
  }

  const timeParts = start.split(':');
  const dateObj = new Date();
  dateObj.setHours(parseInt(timeParts[0]));
  dateObj.setMinutes(parseInt(timeParts[1]));

  // runningTime 은 분 단위
  dateObj.setMinutes(dateObj.getMinutes() + duration);

  let hours = dateObj.getHours();

  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    // midnight
    hours = 12;
  }

  // 항상 두 자릿수로 유지
  const strHours = ('0' + hours).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);

  return `${strHours}:${minutes} ${period}`;
};

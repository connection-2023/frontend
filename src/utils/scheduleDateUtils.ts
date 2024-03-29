import { eachDayOfInterval, set, getDay, parse, format, add } from 'date-fns';
import { calculateUnSelectedDate } from './parseUtils';
import {
  IDayTimeList,
  IDateTimeList,
  IRegularClassSchedule,
  IClassSchedule,
} from '@/types/class';

const dayMapping: {
  [key in '일' | '월' | '화' | '수' | '목' | '금' | '토']: number;
} = { 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6 };

const makeNewDate = (date: Date, time: string) => {
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  return set(date, { hours: hour, minutes: minute });
};

// 원데이 최종 날짜 계산
export const calculateFinalDates = (
  startDate: string,
  endDate: string,
  schedules: IDayTimeList[] | IDateTimeList[],
  holidays: {
    holiday: string;
  }[],
) => {
  if (schedules.length === 0) return [];

  const allDatesInRange = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const holidayDates = holidays.map((holiday) => new Date(holiday.holiday));

  if ('day' in schedules[0]) {
    // 요일별 선택 시
    const dayTimeSchedules = schedules as IDayTimeList[];

    const getDateTime = dayTimeSchedules.reduce((acc: Date[], schedule) => {
      const days = schedule.day.map((dayStr) => dayMapping[dayStr]);

      schedule.dateTime.forEach((time) => {
        allDatesInRange.forEach((date) => {
          const day = getDay(date);

          if (days.includes(day)) {
            const newDate = makeNewDate(date, time);
            acc.push(newDate);
          }
        });
      });

      return acc;
    }, []);

    return calculateUnSelectedDate(getDateTime, holidayDates);
  } else {
    // 특정 날짜 선택 시
    const dateTimeSchedules = schedules as IDateTimeList[];

    return dateTimeSchedules.reduce((acc: Date[], schedule) => {
      schedule.dateTime.forEach((time) => {
        const newDate = makeNewDate(new Date(schedule.date), time);
        acc.push(newDate);
      });

      return acc;
    }, []);
  }
};

// 정기 클래스 최종 날짜 계산
export const calculateRegularFinalClass = (
  startDate: string,
  endDate: string,
  schedules: IDayTimeList[],
  holidays: {
    holiday: string;
  }[],
) => {
  if (schedules.length === 0) return [];
  const holidayDates = holidays.map((holiday) => new Date(holiday.holiday));
  const allDatesInRange = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const allDates = calculateUnSelectedDate(allDatesInRange, holidayDates);

  const results: {
    day: string[];
    dateTime: string;
    startDateTime: Date[];
  }[] = [];

  schedules.forEach((schedule) => {
    const days = schedule.day.map((dayStr) => dayMapping[dayStr]);

    schedule.dateTime.forEach((time) => {
      const startDateTime: Date[] = [];

      allDates.forEach((date) => {
        const day = getDay(date);
        if (days.includes(day)) {
          const newDate = makeNewDate(date, time);
          startDateTime.push(newDate);
        }
      });

      results.push({
        day: schedule.day,
        dateTime: time,
        startDateTime,
      });
    });
  });

  return results;
};

export const getDatesFromSchedules = (
  schedules: IRegularClassSchedule[] | IClassSchedule[],
) => {
  if ('regularLectureSchedule' in schedules[0]) {
    return (schedules as IRegularClassSchedule[])
      .flatMap((schedule) => schedule.regularLectureSchedule)
      .map((schedule) => new Date(schedule.startDateTime));
  } else
    return (schedules as IClassSchedule[]).map(
      (schedule) => new Date(schedule.startDateTime),
    );
};

export const getRegularScheduleTime = (time: string, duration: number) => {
  const date = parse(time, 'HH:mm', new Date());
  const newDate = add(date, { minutes: duration });

  return format(newDate, 'HH:mm');
};

import { parse, format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';

export const formatClassTime = (startDateTime: string, endDateTime: string) => {
  const formattedStartDate = format(new Date(startDateTime), 'yy/MM/dd HH:mm');
  const formattedEndDate = formatTimeNoSec(endDateTime);

  // ex. 24/01/18 22:50-10:50
  return `${formattedStartDate}-${formattedEndDate}`;
};

export const formatShortDate = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yy.MM.dd')
    : format(parseISO(date), 'yy.MM.dd');

export const formatFullDateTime = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yyyy.MM.dd HH:mm:ss')
    : format(parseISO(date), 'yyyy.MM.dd HH:mm:ss');

export const formatDateTimeNoSec = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yyyy.MM.dd HH:mm')
    : format(parseISO(date), 'yyyy.MM.dd HH:mm');

export const formatKoreanDateTime = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'MM월 dd일 (eee) HH:mm', { locale: ko })
    : format(parseISO(date), 'MM월 dd일 (eee) HH:mm', { locale: ko });

export const formatKoreanFullDate = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yyyy년 MM월 dd일 eeee', {
        locale: ko,
      })
    : format(parseISO(date), 'yyyy년 MM월 dd일 eeee', {
        locale: ko,
      });

export const formatDateWithDay = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yy.MM.dd (E)', { locale: ko })
    : format(parseISO(date), 'yy.MM.dd (E)', { locale: ko });

export const formatTimeNoSec = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'HH:mm')
    : format(parseISO(date), 'HH:mm');

export const formatDateWithHyphens = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'yyyy-MM-dd')
    : format(parseISO(date), 'yyyy-MM-dd');

export const parseHyphenatedDate = (date: string) =>
  parse(date, 'yyyy-MM-dd', new Date());

export const format12HourTime = (date: Date | string) =>
  date instanceof Date
    ? format(date, 'hh:mm aa')
    : format(parseISO(date), 'hh:mm aa');

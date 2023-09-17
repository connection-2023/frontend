'use client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { WEEK_DAYS } from '../../constants/constants';
import { tileClassName as generateTileClass } from './tileClassName';
import './interactionCalendar.css';

type CalendarValuePiece = Date | null;
type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece];

interface ICalendarProps {
  mode: 'filter' | 'class';
  dateList?: Date[] | null;
}
const InteractionCalendar = ({ mode, dateList = null }: ICalendarProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (dateList !== null) setSelectedDates(dateList);
  }, []);

  const onChangeDateSelection = (value: CalendarValue) => {
    if (value instanceof Date && mode === 'filter') {
      setSelectedDates((prevSelectedDays) => {
        const dateAsString = value.toDateString();
        const isSelected = prevSelectedDays.some(
          (selectedDay) => selectedDay.toDateString() === dateAsString,
        );

        const updatedDates = isSelected
          ? prevSelectedDays.filter(
              (selectedDay) => selectedDay.toDateString() !== dateAsString,
            )
          : [...prevSelectedDays, value];

        return updatedDates.sort((a, b) => a.getTime() - b.getTime());
      });
    }
  };

  const tileClassGenerator = ({ date }: { date: Date }) =>
    generateTileClass({ date, selectedDates });

  const isTileDisabled = ({ date }: { date: Date }) => {
    return !selectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear(),
    );
  };

  return (
    <Calendar
      onChange={onChangeDateSelection}
      locale="ko-KR"
      formatMonthYear={(locale, date) =>
        date.toLocaleString(locale, { month: 'long' })
      }
      formatShortWeekday={(locale, date) => WEEK_DAYS[date.getDay()]}
      calendarType="gregory"
      tileClassName={tileClassGenerator}
      tileDisabled={isTileDisabled}
      formatDay={(locale, date) => `${date.getDate()}`}
      className={`${mode === 'filter' ? 'filter-mode' : 'class-mode'}`}
    />
  );
};
export default InteractionCalendar;

'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { WEEK_DAYS } from '../../constants/constants';
import { tileClassName as generateTileClass } from './tileClassName';
import '../../styles/calendar.css';

type CalendarValuePiece = Date | null;
type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece];

const InteractionCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const onChangeDateSelection = (value: CalendarValue) => {
    if (value instanceof Date) {
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
      formatDay={(locale, date) => `${date.getDate()}`}
    />
  );
};
export default InteractionCalendar;

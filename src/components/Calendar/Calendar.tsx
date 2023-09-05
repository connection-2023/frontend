'use client';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const Calendar = ({ selectedDates }: { selectedDates: Date[] }) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const tileClassName = ({ date }: { date: Date }) => {
    const isContinuous = (current: Date, next: Date) => {
      return (
        Math.abs(current.getTime() - next.getTime()) === 24 * 60 * 60 * 1000
      );
    };

    for (let i = 0; i < selectedDates.length; i++) {
      if (selectedDates[i].getTime() === date.getTime()) {
        const prevDate = selectedDates[i - 1];
        const nextDate = selectedDates[i + 1];

        const isPrevContinuous = prevDate && isContinuous(prevDate, date);
        const isNextContinuous = nextDate && isContinuous(date, nextDate);

        if (isPrevContinuous && !isNextContinuous) {
          return 'selected-continuous-last';
        } else if (!isPrevContinuous && isNextContinuous) {
          return 'selected-continuous-first';
        } else if (isPrevContinuous || isNextContinuous) {
          return 'selected-continuous';
        }

        return 'selected';
      }
    }

    return null;
  };

  return (
    <>
      <ReactCalendar
        locale="ko-KR"
        formatMonthYear={(locale, date) =>
          date.toLocaleString(locale, { month: 'long' })
        }
        formatShortWeekday={(locale, date) => weekDays[date.getDay()]}
        calendarType="gregory"
        tileClassName={tileClassName}
        formatDay={(locale, date) => `${date.getDate()}`}
      />
    </>
  );
};

export default Calendar;

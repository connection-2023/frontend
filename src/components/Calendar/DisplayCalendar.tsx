import ReactCalendar from 'react-calendar';
import { WEEK_DAYS } from '../../constants/constants';
import { tileClassName } from './tileClassName';
import './displayCalendar.css';

const DisplayCalendar = ({ selectedDates }: { selectedDates: Date[] }) => {
  const tileClassGenerator = ({ date }: { date: Date }) => {
    return tileClassName({ date, selectedDates });
  };

  return (
    <ReactCalendar
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

export default DisplayCalendar;

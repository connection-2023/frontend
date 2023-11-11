import { subMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import React from 'react';
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
  CaptionProps,
} from 'react-day-picker';
import { FormattedCaption } from '../../utils/calendarUtils/CalendarCaption';
import {
  DAY_MODIFIERS_CLASSNAMES,
  DISABLED_AFTER,
  DISABLED_BEFORE,
} from '../../utils/calendarUtils/dateUtils';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface IRangeCalendarProps {
  mode: 'class' | 'income';
  selectedRange: DateRange | undefined;
  handleRangeSelect: SelectRangeEventHandler;
}

const RangeCalendar = ({
  mode,
  selectedRange,
  handleRangeSelect,
}: IRangeCalendarProps) => {
  const modifiers = mode === 'class' ? DISABLED_BEFORE : DISABLED_AFTER;
  const defaultMonth = mode === 'class' ? new Date() : subMonths(new Date(), 1);

  return (
    <DayPicker
      mode="range"
      locale={ko}
      showOutsideDays
      selected={selectedRange}
      onSelect={handleRangeSelect}
      numberOfMonths={2}
      defaultMonth={defaultMonth}
      modifiers={modifiers}
      modifiersClassNames={DAY_MODIFIERS_CLASSNAMES}
      classNames={{
        cell: 'range-cell',
      }}
      className="absolute left-4 top-3 z-10 flex w-fit -translate-x-4 translate-y-5 rounded-md border border-solid border-gray-500 bg-white px-3 py-4"
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
    />
  );
};

export default React.memo(RangeCalendar);

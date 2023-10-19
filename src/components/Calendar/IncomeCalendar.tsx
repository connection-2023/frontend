import { subMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
  CaptionProps,
} from 'react-day-picker';
import { DAY_MODIFIERS, DAY_MODIFIERS_CLASSNAMES } from '@/constants/constants';
import { FormattedCaption } from './BasicCalendar';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface IRangeCalendarProps {
  selectedRange: DateRange | undefined;
  handleRangeSelect: SelectRangeEventHandler;
}
const IncomeCalendar = ({
  selectedRange,
  handleRangeSelect,
}: IRangeCalendarProps) => {
  const dateOptions = {
    ...DAY_MODIFIERS,
    disabled: { after: new Date() },
  };

  return (
    <DayPicker
      mode="range"
      locale={ko}
      showOutsideDays
      selected={selectedRange}
      onSelect={handleRangeSelect}
      numberOfMonths={2}
      defaultMonth={subMonths(new Date(), 1)}
      modifiers={dateOptions}
      modifiersClassNames={DAY_MODIFIERS_CLASSNAMES}
      classNames={{
        cell: 'range-cell',
      }}
      className="absolute left-4 top-3 z-10 flex w-fit -translate-x-4 translate-y-5 rounded-[0.31rem] border border-solid border-sub-color2 bg-white px-3 py-4"
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
    />
  );
};

export default IncomeCalendar;

'use client';
import { useState } from 'react';
import { DayPicker, CaptionProps, useNavigation } from 'react-day-picker';
import { ko } from 'date-fns/esm/locale';
import { format } from 'date-fns';
import {
  DAY_MODIFIERS,
  DAY_MODIFIERS_CLASSNAMES,
} from '../../constants/constants';
import { ArrowRightSVG } from '../../../public/icons/svg';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface ICalendarProps {
  mode: 'preview' | 'filter';
  selectedDates?: Date[];
}

const BasicCalendar = ({ mode, selectedDates = [] }: ICalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>(selectedDates);

  return (
    <div
      className={
        mode === 'preview'
          ? 'rounded-[0.625rem] py-1 shadow-[1px_1px_6px_1px_rgba(0,0,0,0.25)]'
          : ''
      }
    >
      <DayPicker
        locale={ko}
        showOutsideDays
        mode={mode === 'preview' ? 'default' : 'multiple'}
        selected={selected}
        onSelect={setSelected}
        modifiers={DAY_MODIFIERS}
        modifiersClassNames={DAY_MODIFIERS_CLASSNAMES}
        components={{
          Caption: ({ displayMonth }: CaptionProps) =>
            FormattedCaption({
              displayMonth,
            }),
        }}
      />
    </div>
  );
};

export default BasicCalendar;

export const FormattedCaption = ({ displayMonth }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex w-full justify-between px-3">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <ArrowRightSVG className="origin-center rotate-180" />
      </button>
      <p className="text-base font-bold">
        {format(displayMonth, 'yy년 MM월', { locale: ko })}
      </p>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ArrowRightSVG />
      </button>
    </div>
  );
};

'use client';
import { format } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps, useNavigation } from 'react-day-picker';
import { ArrowRightSVG } from '@/icons/svg';
import {
  DAY_MODIFIERS,
  DAY_MODIFIERS_CLASSNAMES,
} from '../../constants/constants';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface ICalendarProps {
  mode: 'preview' | 'filter';
  selectedDates?: Date[];
  handleSelected?: (value: Date[]) => void;
}

const BasicCalendar = ({
  mode,
  selectedDates = [],
  handleSelected,
}: ICalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>(selectedDates);

  useEffect(() => {
    if (handleSelected !== undefined && selected) {
      handleSelected(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(selectedDates);
  }, [selectedDates]);

  return (
    <div
      className={
        mode === 'preview' ? 'rounded-[0.625rem] py-1 shadow-horizontal' : ''
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
        <ArrowRightSVG className="h-[5px] w-[9px] origin-center rotate-180 stroke-black" />
      </button>
      <p className="text-base font-bold">
        {format(displayMonth, 'yy년 MM월', { locale: ko })}
      </p>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ArrowRightSVG className="h-[5px] w-[9px] stroke-black" />
      </button>
    </div>
  );
};

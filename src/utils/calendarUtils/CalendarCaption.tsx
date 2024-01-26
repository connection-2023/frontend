import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { CaptionProps, useNavigation } from 'react-day-picker';
import { ArrowUpSVG } from '@/icons/svg';

export const FormattedCaption = ({ displayMonth }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex w-full justify-between px-3">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label="prev-month"
      >
        <ArrowUpSVG
          width="22"
          height="22"
          className="origin-center -rotate-90 fill-black"
        />
      </button>
      <p className="text-base font-bold">
        {format(displayMonth, 'yy년 MM월', { locale: ko })}
      </p>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        aria-label="next-month"
      >
        <ArrowUpSVG
          width="22"
          height="22"
          className="origin-center rotate-90 fill-black"
        />
      </button>
    </div>
  );
};

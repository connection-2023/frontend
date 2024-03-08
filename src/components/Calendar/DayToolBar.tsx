import { View, ToolbarProps } from 'react-big-calendar';
import { ArrowUpSVG } from '@/icons/svg';

interface IToolbarProps extends Partial<ToolbarProps> {
  label: string;
  view: View;
  // eslint-disable-next-line no-unused-vars
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
}

const DayToolBar = ({ label, onNavigate }: IToolbarProps) => (
  <div className="mb-2.5 flex items-center justify-between gap-4 whitespace-nowrap">
    <h2 className="text-lg font-semibold text-gray-100">{label}</h2>
    <div className="flex h-[1.875rem] w-32 divide-x divide-solid overflow-hidden rounded-md border border-solid border-gray-500">
      <button
        aria-label="이전 날짜로 이동"
        onClick={() => onNavigate('PREV')}
        className={`h-7 origin-center rotate-180 ${NavButtonStyle}`}
      >
        <ArrowUpSVG className="h-7 w-full origin-center rotate-90 fill-black" />
      </button>
      <button
        aria-label="오늘 날짜로 이동"
        onClick={() => onNavigate('TODAY')}
        className="flex-1 hover:bg-gray-700 "
      >
        Today
      </button>
      <button
        aria-label="다음 날짜로 이동"
        onClick={() => onNavigate('NEXT')}
        className={`h-7 ${NavButtonStyle}`}
      >
        <ArrowUpSVG className="h-7 w-full origin-center rotate-90 fill-black" />
      </button>
    </div>
  </div>
);

const NavButtonStyle =
  'flex w-[1.875rem] items-center justify-center hover:bg-gray-700';

export default DayToolBar;

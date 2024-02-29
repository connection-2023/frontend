import { ToolbarProps, View } from 'react-big-calendar';
import { ArrowRightSVG } from '@/icons/svg';

interface IToolbarProps extends Partial<ToolbarProps> {
  label: string;
  view: View;
  // eslint-disable-next-line no-unused-vars
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
  // eslint-disable-next-line no-unused-vars
  onView: (view: View) => void;
}

const views: { label: string; value: View }[] = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
];

const ToolBar = ({ label, view, onNavigate, onView }: IToolbarProps) => (
  <div className="mb-[0.69rem] flex items-center justify-between">
    <div className="flex h-[1.875rem] w-[8.7rem] divide-x divide-solid overflow-hidden rounded-[0.4rem] border border-solid border-gray-500">
      <button
        onClick={() => onNavigate('PREV')}
        className={`origin-center rotate-180 ${NavButtonStyle}`}
      >
        <ArrowRightSVG className="h-[5px] w-[9px] stroke-black" />
      </button>
      <button
        onClick={() => onNavigate('TODAY')}
        className="flex-1 hover:bg-gray-700 "
      >
        Today
      </button>
      <button
        onClick={() => onNavigate('NEXT')}
        className={`${NavButtonStyle}`}
      >
        <ArrowRightSVG className="h-[5px] w-[9px] stroke-black" />
      </button>
    </div>
    <h2 className="text-lg font-bold text-gray-100">{label}</h2>
    <div className="flex gap-[0.38rem] text-base font-normal">
      {views.map((item, index) => (
        <button
          key={index}
          onClick={() => onView(item.value)}
          className={getButtonClass(item.value === view)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export default ToolBar;

const NavButtonStyle =
  'flex w-[1.875rem] items-center justify-center hover:bg-gray-700';

const getButtonClass = (isActive: boolean) =>
  `flex h-7 w-[4.25rem] items-center justify-center rounded-md border border-solid ${
    isActive
      ? 'border-black'
      : 'border-gray-500 text-gray-500 hover:border-gray-500 hover:bg-gray-700 hover:text-gray-500'
  }`;

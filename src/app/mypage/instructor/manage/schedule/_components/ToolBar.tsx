import { ToolbarProps, View } from 'react-big-calendar';
import { ArrowUpSVG } from '@/icons/svg';

/* eslint-disable no-unused-vars */
interface IToolbarProps extends Partial<ToolbarProps> {
  label: string;
  view: View;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
  onView: (view: View) => void;
}
/* eslint-enable no-unused-vars */
const views: { label: string; value: View }[] = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
];

const ToolBar = ({ label, view, onNavigate, onView }: IToolbarProps) => (
  <div className="mb-2.5 flex items-center justify-between">
    <div className="grid h-[1.875rem] w-[8.7rem] grid-cols-4 divide-x divide-solid overflow-hidden rounded-md border border-solid border-gray-500">
      <button onClick={() => onNavigate('PREV')} className={NavButtonStyle}>
        <ArrowUpSVG className="h-7 w-full origin-center -rotate-90 fill-black" />
      </button>
      <button
        onClick={() => onNavigate('TODAY')}
        className="col-span-2 hover:bg-gray-700"
      >
        Today
      </button>
      <button onClick={() => onNavigate('NEXT')} className={NavButtonStyle}>
        <ArrowUpSVG className="h-7 w-full origin-center rotate-90 fill-black" />
      </button>
    </div>
    <h2 className="text-lg font-bold text-gray-100">{label}</h2>
    <div className="flex gap-1.5 text-base font-normal">
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
  'flex w-full h-full items-center justify-center hover:bg-gray-700';

const getButtonClass = (isActive: boolean) =>
  `flex h-7 w-[4.25rem] items-center justify-center rounded-md border border-solid ${
    isActive
      ? 'border-black'
      : 'border-gray-500 text-gray-500 hover:border-gray-500 hover:bg-gray-700 hover:text-gray-500'
  }`;

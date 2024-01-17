import { FILTER_TIME, FILTER_WEEK } from '@/constants/constants';
import { day } from '@/types/class';

interface DayTimeFilterProps {
  filterList: {
    week: day[];
    time: string[];
  };
  changeFilterList: (element: day | string, filter: 'week' | 'time') => void;
}

const DayTimeFilter = ({
  filterList,
  changeFilterList,
}: DayTimeFilterProps) => {
  return (
    <div className="flex select-none sm:max-h-[17rem] sm:w-[16.8rem] sm:text-sm">
      <ul className="flex w-[32%] flex-col justify-center gap-2 border-solid border-slate-300 py-3 sm:border-r">
        {FILTER_WEEK.map((week) => (
          <CheckboxItem
            key={week}
            label={week}
            changeFilterList={changeFilterList}
            filterList={filterList.week}
          />
        ))}
      </ul>
      <ul className="flex w-[68%] flex-col gap-2 py-3">
        {FILTER_TIME.map(({ label }) => (
          <CheckboxItem
            key={label}
            label={label}
            changeFilterList={changeFilterList}
            filterList={filterList.time}
          />
        ))}
      </ul>
    </div>
  );
};

export default DayTimeFilter;

interface CheckboxItemProps {
  label: string;
  changeFilterList: (element: day | string, filter: 'week' | 'time') => void;
  filterList: string[];
}

const CheckboxItem = ({
  label,
  changeFilterList,
  filterList,
}: CheckboxItemProps) => {
  const isdateIncluded = filterList.some((item) => item === label);
  const filter = FILTER_TIME.some((item) => item.label === label)
    ? 'time'
    : 'week';

  return (
    <li className="sm:ml-4">
      <label
        className={`inline-flex cursor-pointer items-center ${
          isdateIncluded && 'font font-bold text-sub-color1'
        }`}
      >
        <input
          type="checkbox"
          checked={isdateIncluded}
          onChange={() => changeFilterList(label, filter)}
          className="mr-2 h-[1.12rem] w-[1.12rem] accent-sub-color1"
        />
        {label}
      </label>
    </li>
  );
};

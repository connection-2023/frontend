import { GROUP_FILTER_LIST } from '@/constants/constants';

interface GroupFilterProps {
  selectFilter: string;
  onChangeSelectFilter: (value: string) => void;
}

const GroupFilter = ({
  selectFilter,
  onChangeSelectFilter,
}: GroupFilterProps) => {
  return (
    <ul className="flex select-none gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1 sm:max-h-80  sm:w-56 sm:flex-col">
      {GROUP_FILTER_LIST.map((group) => (
        <li key={group} className="flex items-center sm:ml-4">
          <input
            id={group}
            type="checkbox"
            checked={group === selectFilter}
            onChange={() => onChangeSelectFilter(group)}
            className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
          />
          <label
            htmlFor={group}
            className={`cursor-pointer
             ${group === selectFilter && 'font font-bold text-sub-color1'}`}
          >
            {group}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default GroupFilter;

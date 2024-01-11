import { METHOD_FILTER_LIST } from '@/constants/constants';

interface MethodFilterProps {
  selectFilter: string;
  onChangeSelectFilter: (value: string) => void;
}

const MethodFilter = ({
  selectFilter,
  onChangeSelectFilter,
}: MethodFilterProps) => {
  return (
    <ul className="flex select-none gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1 sm:max-h-80  sm:w-56 sm:flex-col">
      {METHOD_FILTER_LIST.map((method) => {
        return (
          <li key={method} className="flex items-center sm:ml-4">
            <input
              id={method}
              type="checkbox"
              checked={method === selectFilter}
              onChange={() => onChangeSelectFilter(method)}
              className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
            />
            <label
              htmlFor={method}
              className={`cursor-pointer
             ${method === selectFilter && 'font font-bold text-sub-color1'}`}
            >
              {method}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default MethodFilter;

'use client';
import { filterOption } from '@/constants/constants';
import { ReviewOrderType } from '@/types/class';

interface SortDropdownProps {
  selectedOption: ReviewOrderType;
  onClickList: (listValue: ReviewOrderType) => void;
}

const SortDropdown = ({ selectedOption, onClickList }: SortDropdownProps) => (
  <ul className="absolute right-0 top-8 flex cursor-pointer flex-col overflow-hidden rounded-md bg-white text-sm font-medium text-gray-300 shadow-vertical">
    {filterOption.map((list: ReviewOrderType) => (
      <li
        key={list}
        className={`flex h-7 w-[5.7rem] items-center gap-2 px-2.5 hover:bg-gray-900 ${
          selectedOption === list && 'text-black'
        }`}
        onClick={() => onClickList(list)}
      >
        {list}
      </li>
    ))}
  </ul>
);

export default SortDropdown;

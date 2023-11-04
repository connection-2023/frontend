'use client';
import { useState } from 'react';
import { ArrowDownSVG } from '@/icons/svg';

interface SelectBoxProps {
  lists: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const selectBoxBorderStyle = 'border border-solid border-sub-color2';

const SelectBox = ({ lists, selected, onSelect }: SelectBoxProps) => {
  const [isListOpened, setIsListOpened] = useState(false);

  const openList = () => {
    setIsListOpened(!isListOpened);
  };

  const onClickList = (listValue: string) => {
    onSelect(listValue);
    setIsListOpened(false);
  };

  return (
    <div className="w-full text-sm text-sub-color3">
      <div
        onClick={openList}
        className={`flex h-8 w-full cursor-pointer items-center pl-2 ${selectBoxBorderStyle}`}
      >
        <span className="flex-1">{selected}</span>
        <ArrowDownSVG
          className={`fill-sub-color3 ${isListOpened && 'rotate-180'}`}
        />
      </div>
      <ul
        className={`${
          isListOpened ? 'flex flex-col' : 'hidden'
        } ${selectBoxBorderStyle} divide-y divide-solid divide-sub-color4 border-t-0 `}
      >
        {lists.map((list: string) => {
          const parts = list.split(' ');
          const dateTime = parts.slice(0, parts.length - 1).join(' ');
          const participants = parts[parts.length - 1];

          return (
            <li
              key={list}
              className="flex h-8 cursor-pointer items-center justify-between gap-2 px-2 hover:bg-[#F5F5F5]"
              onClick={() => onClickList(list)}
            >
              <p>{dateTime}</p>
              <p>{participants}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectBox;

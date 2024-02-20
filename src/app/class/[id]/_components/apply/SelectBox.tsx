'use client';
import { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';

interface SelectBoxProps {
  lists: string[];
  selected: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string) => void;
}

const selectBoxBorderStyle = 'border border-solid border-gray-500';

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
    <div className="w-full text-sm">
      <div
        onClick={openList}
        className={`flex h-8 w-full cursor-pointer items-center pl-2 ${selectBoxBorderStyle}`}
      >
        <span className="flex-1">{selected}</span>
        <ArrowUpSVG
          className={`h-[34px] w-[34px] fill-gray-100 ${
            !isListOpened && 'rotate-180'
          }`}
        />
      </div>
      <ul
        className={`${
          isListOpened ? 'flex flex-col' : 'hidden'
        } ${selectBoxBorderStyle} max-h-52 divide-y divide-solid divide-gray-700 overflow-y-auto border-t-0`}
      >
        {lists.map((list: string) => {
          const parts = list.split(' ');
          const dateTime = parts.slice(0, parts.length - 1).join(' ');
          const participants = parts[parts.length - 1];
          const textColor = participants.includes('마감')
            ? 'text-gray-500 pointer-events-none'
            : 'text-gray-100';

          return (
            <li
              key={list}
              className={`flex h-8 shrink-0 cursor-pointer items-center justify-between gap-2 px-2 hover:bg-gray-900 ${textColor}`}
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

'use client';
import { useState } from 'react';
import { ArrowDownSVG } from '@/../public/icons/svg';
import { Space } from '@/types/class';

interface SelectBoxProps {
  type: 'date' | 'time';
  lists: string[];
  space?: Space;
  selected: string;
  onSelect: (type: string, value: string) => void;
}

const selectBoxBorderStyle = 'border border-solid border-sub-color2';

const SelectBox = ({
  type,
  lists,
  space,
  selected,
  onSelect,
}: SelectBoxProps) => {
  const [isListOpened, setIsListOpened] = useState(false);

  const openList = () => {
    setIsListOpened(!isListOpened);
  };

  const onClickList = (listValue: string) => {
    onSelect(type, listValue);
    setIsListOpened(false);
  };

  return (
    <div className="w-full text-sm text-sub-color3">
      <div
        onClick={openList}
        className={`flex h-8 w-full cursor-pointer items-center pl-2 ${selectBoxBorderStyle}`}
      >
        <span className="flex-1">{selected}</span>
        <ArrowDownSVG className="fill-sub-color3" />
      </div>
      <ul
        className={`${
          isListOpened ? 'flex flex-col' : 'hidden'
        } ${selectBoxBorderStyle} divide-y divide-solid divide-sub-color4 border-t-0 `}
      >
        {lists.map((list: string) => (
          <li
            key={list}
            className="flex h-8 items-center gap-2 px-2 hover:bg-[#F5F5F5]"
            onClick={() => onClickList(list)}
          >
            {list}{' '}
            {space && `(${space.total - space.current}/${space.total}명)`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectBox;

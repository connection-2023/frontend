import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ArrowDownSVG } from '../../../public/icons/svg';

interface SelectProps {
  defaultValue: string;
  selectList: string[];
  onChange?: () => void;
}

const NoborderSelect = ({
  defaultValue,
  selectList,
  onChange,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const selectRef = useRef(null);

  useClickAway(selectRef, () => {
    setDropdownVisibility(false);
  });

  const handleSelectionChange = (value: string) => {
    setSelectedValue(value);
  };

  const toggleDropdownVisibility = () => {
    setDropdownVisibility((prev) => !prev);
  };

  return (
    <div
      ref={selectRef}
      onClick={toggleDropdownVisibility}
      className={`relative flex cursor-pointer items-center ${
        isDropdownVisible &&
        'rounded-t-md shadow-[1px_-1px_4px_0px_rgba(0,0,0,0.25)]'
      }`}
    >
      {selectedValue}
      <ArrowDownSVG className="h-7 w-[1.6rem] -translate-x-1.5 -translate-y-1 fill-sub-color2" />
      {isDropdownVisible && (
        <ul className="absolute left-0 right-0 top-full rounded-b-md bg-white shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]">
          {selectList.map((value) =>
            selectedValue === value ? null : (
              <li
                key={value}
                className="border-t border-solid border-sub-color2 hover:bg-[#eceaea]"
                onClick={() => handleSelectionChange(value)}
              >
                {value}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export default NoborderSelect;

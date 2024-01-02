'use client';

interface DropdownProps {
  options: {
    onClick: React.MouseEventHandler<HTMLLIElement>;
    component: React.ReactNode;
  }[];
}

const Dropdown = ({ options }: DropdownProps) => (
  <ul className="absolute right-0 top-8 flex flex-col divide-y divide-solid divide-gray-700 overflow-hidden rounded-md border border-solid border-black bg-white text-sm font-medium text-gray-300">
    {options.map((list, index) => (
      <li
        key={index}
        className="flex h-8 cursor-pointer items-center gap-2 px-3 text-black hover:bg-gray-900"
        onClick={list.onClick}
      >
        {list.component}
      </li>
    ))}
  </ul>
);

export default Dropdown;

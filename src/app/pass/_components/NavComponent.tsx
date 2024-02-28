import React from 'react';

const NavComponent = () => {
  const sortOptionList: {
    id: 'LATEST' | 'STARS';
    label: string;
  }[] = [
    {
      id: 'LATEST',
      label: '최신순',
    },
    {
      id: 'STARS',
      label: '별점순',
    },
  ];

  return (
    <nav>
      <div className="flex items-center gap-3 sm:gap-5">
        {sortOptionList.map((option) => (
          <div key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-gray-500 peer-checked:text-black"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavComponent;

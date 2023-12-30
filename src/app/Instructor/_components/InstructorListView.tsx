'use client';
import { useState } from 'react';
import Filters from '@/components/Filter/Filters';

const InstructorListView = () => {
  const sortOptions: {
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
    <div className="px-4 sm:px-9 xl:px-14">
      <nav className="mt-4 flex flex-col gap-1">
        <Filters type="instructor" />

        <div className="flex gap-2">
          {sortOptions.map((option) => (
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
    </div>
  );
};

export default InstructorListView;

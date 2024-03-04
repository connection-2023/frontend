'use client';

import Link from 'next/link';
import React from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';

const NavComponent = ({
  sortOption,
}: {
  sortOption: 'LATEST' | 'POPULAR' | 'LOWEST_PRICE';
}) => {
  const sortOptionList: {
    id: 'LATEST' | 'POPULAR' | 'LOWEST_PRICE';
    label: string;
  }[] = [
    {
      id: 'LATEST',
      label: '최신순',
    },
    {
      id: 'POPULAR',
      label: '인기순',
    },
    {
      id: 'LOWEST_PRICE',
      label: '가격 낮은순',
    },
  ];

  const { changeParams } = useChangeSearchParams();

  return (
    <nav className="flex flex-wrap justify-between gap-4 whitespace-nowrap sm:gap-0">
      <div className="flex items-center gap-3 sm:gap-5">
        {sortOptionList.map((option) => (
          <div key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
              checked={sortOption === option.id}
              onChange={() =>
                changeParams({ name: 'sortOption', value: option.id })
              }
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
      <Link
        href="/mypage/user/pass"
        className="rounded-md border border-solid border-black px-3 py-2"
      >
        내 패스권 보러가기
      </Link>
    </nav>
  );
};

export default NavComponent;

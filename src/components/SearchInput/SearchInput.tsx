'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { ArrowDownSVG, SearchSVG } from '@/icons/svg';

const SearchInput = ({ query }: { query: string }) => {
  const [navView, setNavView] = useState(false);
  const [keyword, setKeyword] = useState(query);
  const navRef = useRef(null);
  const { pathname, changeParams, getCurrentParamsToObject } =
    useChangeSearchParams();

  const searchKeyword = () => {
    changeParams({ name: 'query', value: keyword });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useClickAway(navRef, () => {
    setNavView(false);
  });

  const options = [
    {
      path: '/search',
      label: '전체',
    },
    {
      path: '/instructor',
      label: '강사',
    },
    {
      path: '/class',
      label: '클래스',
    },
    {
      path: '/pass',
      label: '패스권',
    },
  ];

  const selectedOption = options.find(({ path }) => path === pathname);

  return (
    <div className="relative flex h-12">
      <nav ref={navRef} className="relative mr-2 h-full w-[5.6rem]">
        {navView && (
          <ul className="peer absolute top-12 z-10 flex w-full flex-col">
            {options.map(({ path, label }, index) => {
              if (label === selectedOption?.label) {
                return;
              }

              return (
                <li
                  key={path}
                  className={`h-12 border-x border-b border-solid border-black bg-white hover:bg-black hover:text-lg hover:text-white ${
                    index === options.length - 1
                      ? 'rounded-b-2xl border-b-black'
                      : 'border-b-gray-700'
                  }`}
                >
                  <Link
                    className="flex h-full w-full items-center pl-2.5"
                    href={{
                      pathname: path,
                      query: getCurrentParamsToObject(),
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <button
          onClick={() => setNavView((prev) => !prev)}
          className={`flex h-full w-full items-center justify-center text-lg peer-hover:bg-white peer-hover:text-black ${
            navView
              ? 'rounded-t-2xl border border-solid border-black border-b-gray-700 bg-black text-white peer-hover:text-base [&>*:nth-child(1)]:fill-white peer-hover:[&>*:nth-child(1)]:fill-black'
              : '[&>*:nth-child(1)]:fill-black'
          }`}
        >
          {selectedOption?.label}
          <ArrowDownSVG className="h-7 w-7  duration-300" />
        </button>
      </nav>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        className=" w-full rounded-xl p-4 text-lg shadow-vertical focus:outline-none"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchKeyword();
          }
        }}
      />
      <button onClick={searchKeyword}>
        <SearchSVG className="absolute right-4 top-1/2 h-[1.8rem] w-[1.8rem] -translate-y-1/2 transform fill-black" />
      </button>
    </div>
  );
};

export default SearchInput;

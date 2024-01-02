'use client';
import React, { useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { SearchSVG } from '@/icons/svg';

const SearchInput = ({ query }: { query: string }) => {
  const [keyword, setKeyword] = useState(query);
  const { changeParams } = useChangeSearchParams();

  const searchKeyword = () => {
    changeParams({ name: 'query', value: keyword });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="relative flex">
      <button className="relative">선택된 거</button>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        className="h-12 w-full rounded-xl p-4 text-lg shadow-vertical focus:outline-none"
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

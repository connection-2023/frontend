'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SearchSVG } from '@/icons/svg';

const ResultInput = ({ query }: { query: string }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(query);

  const searchKeyword = () => {
    router.push(`/search?query=${keyword}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="relative">
      <input
        value={keyword}
        onChange={handleInputChange}
        className="h-12 w-full rounded-xl p-4 text-lg shadow-vertical focus:shadow-sub-color1 focus:outline-none"
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

export default ResultInput;

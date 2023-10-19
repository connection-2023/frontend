'use client';
import { useState } from 'react';
import { dummyUserInputSuggestion } from '@/constants/dummy';
import { SearchSVG, ClearSVG } from '@/icons/svg';

const SearchInput = () => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClickClear = () => {
    setKeyword('');
  };

  return (
    <div className="border-box flex h-full w-full items-center">
      <SearchSVG
        width={22}
        height={22}
        className="h-[22px] w-[22px] fill-black"
      />
      <input
        className="border-box relative mx-2 flex-1 text-lg font-bold focus:outline-none"
        value={keyword}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      />
      <ClearSVG
        width={21}
        height={21}
        onClick={onClickClear}
        className="mr-1 w-[21px] cursor-pointer fill-sub-color4"
      />
      {keyword.trim() !== '' && (
        <div className="absolute top-[10rem] flex min-h-[450px] w-[95%] flex-col gap-3 bg-white p-2 text-lg">
          {dummyUserInputSuggestion.map((suggestion) => (
            <p key={suggestion}>
              {suggestion
                .split(new RegExp(`(${keyword})`, 'gi'))
                .map((char, index) =>
                  char.toLowerCase() === keyword.toLowerCase() ? (
                    <span key={index} className="text-sub-color1">
                      {char}
                    </span>
                  ) : (
                    char
                  ),
                )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

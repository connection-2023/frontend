'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SEARCH_LOCAL_STORAGE_KEY } from '@/constants/constants';
import { dummyUserInputSuggestion } from '@/constants/dummy';
import { SearchSVG, ClearSVG } from '@/icons/svg';
import { useUserStore } from '@/store';

const SearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const authUser = useUserStore((state) => state.authUser);
  const localStorage = window.localStorage;
  const router = useRouter();

  const searchKeyword = () => {
    router.push(`/search?query=${keyword}`);

    if (!authUser) {
      const prevKeys = localStorage.getItem(SEARCH_LOCAL_STORAGE_KEY);
      const prevSearchKeys = prevKeys ? prevKeys.split(',') : [];
      const keywordIndex = prevSearchKeys.indexOf(keyword);

      if (keywordIndex > -1) {
        prevSearchKeys.splice(keywordIndex, 1);
      }

      prevSearchKeys.unshift(keyword);

      const newSearchKeys = prevSearchKeys.join(',');

      localStorage.setItem(SEARCH_LOCAL_STORAGE_KEY, newSearchKeys);
    }
  };

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
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchKeyword();
          }
        }}
      />
      {keyword && (
        <ClearSVG
          width={21}
          height={21}
          onClick={onClickClear}
          className="cursor-pointer fill-gray-700 stroke-white stroke-2"
        />
      )}
      {keyword.trim() !== '' && (
        <div className="absolute top-[10rem] flex min-h-[450px] w-full max-w-[50rem] flex-col gap-3 bg-white p-2 text-lg">
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

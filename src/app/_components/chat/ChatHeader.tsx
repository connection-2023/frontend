import { useEffect, useRef, useState } from 'react';
import { CloseSVG, SearchSVG } from '@/icons/svg';

const ChatHeader = () => {
  const [search, setSearch] = useState({ view: false, value: '' });
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.view && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search.view]);

  const searchViewBlur = () => {
    if (!search.value) {
      setSearch((prev) => ({ ...prev, view: false }));
    }
  };

  const searchValue = () => {
    console.log(search.value);
    //추후 수정
  };

  const searchViewHandler = () => {
    setSearch((prev) => ({ ...prev, view: true }));
  };

  return (
    <header className="flex justify-between">
      <div
        className={`${
          search.view ? 'border-b border-gray-500' : ''
        } flex gap-1`}
      >
        {search.view ? (
          <input
            value={search.value}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, value: e.target.value }))
            }
            ref={searchInputRef}
            placeholder="사용자를 검색해주세요"
            type="search"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchValue();
              }
            }}
            onBlur={searchViewBlur}
            className="h-[26px] w-full outline-none placeholder:text-gray-500"
          />
        ) : (
          <h1 className="font-semibold">채팅</h1>
        )}
        <button onClick={search.view ? searchValue : searchViewHandler}>
          <SearchSVG className="h-[21px] w-[21px] fill-gray-300" />
        </button>
      </div>
      <button>
        <CloseSVG className="h-[21px] w-[21px] stroke-gray-300 stroke-2" />
      </button>
    </header>
  );
};

export default ChatHeader;

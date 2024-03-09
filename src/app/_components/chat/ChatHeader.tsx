import { useEffect, useRef, useState } from 'react';
import { CloseSVG, SearchSVG } from '@/icons/svg';

interface ChatHeaderProps {
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const ChatHeader = ({ StartChatPositionDrag }: ChatHeaderProps) => {
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
    <header
      onPointerDown={StartChatPositionDrag}
      className="relative flex h-10 cursor-move justify-between gap-2 bg-[#414141] pb-2 pl-3 pr-1 pt-2 text-white"
    >
      <div className="pointer-events-none absolute -left-2 -top-2 -z-10 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] rounded-t-md bg-[#414141]" />
      <div
        className={`${
          search.view ? 'border-b border-gray-500' : ''
        } flex w-full gap-1 sm:max-w-[17rem]`}
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
            className="h-[26px] w-full bg-transparent outline-none placeholder:text-gray-500"
          />
        ) : (
          <h1 className="font-semibold">채팅</h1>
        )}
        <button
          onClick={search.view ? searchValue : searchViewHandler}
          className="mr-2"
        >
          <SearchSVG className="h-[21px] w-[21px] fill-white" />
        </button>
      </div>
      <button>
        <CloseSVG className="h-[21px] w-[21px] stroke-white stroke-2" />
      </button>
    </header>
  );
};

export default ChatHeader;

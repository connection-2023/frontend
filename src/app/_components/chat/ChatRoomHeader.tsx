import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { OptionSVG } from '@/icons/svg';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/Profile/ProfileImage';

interface ChatRoomHeaderProps {
  isOnline: boolean;
}

const ChatRoomHeader = ({ isOnline }: ChatRoomHeaderProps) => {
  const [optionView, setOptionView] = useState(false);
  const optionRef = useRef(null);

  useClickAway(optionRef, () => {
    setOptionView(false);
  });

  return (
    <header className="flex px-[10px] py-3">
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center">
          <Link href="/강사id">
            <ProfileImg src={null} size="small" />
          </Link>
          <dl className="grid flex-grow grid-rows-2 text-sm">
            <Link href="/강사id">
              <dt>닉네임</dt>
            </Link>
            <div className="grid w-full grid-cols-[9px_auto_1fr] items-center gap-x-1">
              <div
                className={`size-[9px] rounded-full ${
                  isOnline ? 'bg-main-color' : 'bg-gray-500'
                }`}
              />
              <dd
                className={`mr-1 ${
                  isOnline ? 'text-main-color' : 'text-gray-500'
                }`}
              >
                {isOnline ? '활동중' : '오프라인'}
              </dd>
              <dd className="grid w-full grid-cols-[auto_1fr] text-main-color">
                <span className="truncate">{`'클래스`}</span>
                <span className="whitespace-nowrap">{`' 수강중`}</span>
              </dd>
            </div>
          </dl>
        </div>
        <button
          ref={optionRef}
          onClick={() => setOptionView((prev) => !prev)}
          className="relative self-end"
        >
          <OptionSVG
            className={`peer rotate-90 cursor-pointer hover:fill-black ${
              optionView ? 'fill-black' : 'fill-gray-500'
            }`}
          />
          {optionView && (
            <Dropdown
              className="right-0 w-[8.5rem]"
              options={[
                {
                  component: <Link href="/instructor/">신고하기</Link>,
                },
                {
                  component: <button>채팅방 나가기</button>,
                },
              ]}
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default ChatRoomHeader;

{
  /* <Link href="/강사id">
<ProfileImg src={null} size="small" />
</Link>
<dl className="flex flex-col text-sm">
<Link href="/강사id">
  <dt>닉네임</dt>
</Link>
<div className="flex items-center gap-1">
  <div
    className={`size-[9px] rounded-full ${
      isOnline ? 'bg-main-color' : 'bg-gray-500'
    }`}
  />
  <dd className="mr-2">{isOnline ? '활동중' : '오프라인'}</dd>
  <dd className="flex text-main-color">
    <div className="w-1/4 truncate">
      클래스클래스클래스클래스클래스클래스클래스클래스클래스클래스클래스클래스
    </div>
    수강중
  </dd>
</div>
</dl> */
}

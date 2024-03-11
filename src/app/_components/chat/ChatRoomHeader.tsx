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
        <div className="flex">
          <Link href="/강사id">
            <ProfileImg src={null} size="small" />
          </Link>
          <dl className="flex flex-col text-sm">
            <Link href="/강사id">
              <dt>닉네임</dt>
            </Link>
            <div className="flex items-center gap-1">
              <span
                className={`size-[9px] rounded-full ${
                  isOnline ? 'bg-main-color' : 'bg-gray-500'
                }`}
              />
              <dd className="mr-2">{isOnline ? '활동중' : '오프라인'}</dd>
              <dd>클래스 수강중</dd>
            </div>
          </dl>
        </div>
        <button
          ref={optionRef}
          onClick={() => setOptionView((prev) => !prev)}
          className="relative"
        >
          <OptionSVG
            className={`peer cursor-pointer hover:fill-black ${
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

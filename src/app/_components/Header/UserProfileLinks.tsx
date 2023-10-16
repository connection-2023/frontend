import { useState } from 'react';
import Link from 'next/link';
import Profile from './Profile';
import { dummyUserInfo } from '@/constants/dummy';
import { AlarmSVG, CommentSVG, SearchSVG } from '../../../../public/icons/svg';
import AuthModal from '@/components/Header.tsx/Auth/AuthModal';

const UserProfileLinks = () => {
  const { alarmCount, commentCount } = dummyUserInfo;
  const [isOpened, setIsOpened] = useState(false);

  const handleOpened = () => {
    setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
  };

  return (
    <div className="flex items-end gap-3">
      <h2 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 유저 메뉴
      </h2>

      <Link href="/search">
        <SearchSVG className="h-[1.8rem] w-[1.8rem] fill-black" />
      </Link>

      <div className="text-lg">
        <button onClick={handleOpened}>로그인/회원가입</button>
      </div>

      {isOpened && <AuthModal isOpened={isOpened} isClosed={handleClosed} />}
      {/* { <button className="relative">
        <AlarmSVG className="pt-0.5" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {alarmCount}
        </span>
      </button>

      <button className="relative">
        <CommentSVG fill="black" width="29" height="30" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {commentCount}
        </span>
      </button>

      <Profile />} */}
    </div>
  );
};

export default UserProfileLinks;

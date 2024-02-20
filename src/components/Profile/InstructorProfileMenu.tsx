'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ProfileImgSize } from '@/constants/constants';
import { ChatSVG } from '@/icons/svg';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/Profile/ProfileImage';

interface InstructorProfileMenuProps {
  instructorId: number | string;
  profileImg: string | null;
  nickname: string;
  chatIcon?: boolean;
  profileSize?: keyof typeof ProfileImgSize;
}

const InstructorProfileMenu = ({
  instructorId,
  nickname,
  profileImg,
  chatIcon = true,
  profileSize = 'small',
}: InstructorProfileMenuProps) => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
  const listRef = useRef(null);

  useClickAway(listRef, () => {
    setIsProfileMenuOpened(false);
  });

  const profileOptions = [
    {
      component: <Link href={`/instructor/${instructorId}`}>프로필 보기</Link>,
    },
    {
      component: <Link href={`/chat/${instructorId}`}>채팅하기</Link>,
    },
    {
      component: (
        <Link
          href={`/report?targetLecturerId=${instructorId}`}
          prefetch={false}
        >
          신고하기
        </Link>
      ),
    },
    {
      // 추후 연결 필요
      component: <p>차단하기</p>,
    },
  ];

  return (
    <div className="relative" ref={listRef}>
      <div className="flex w-fit items-center gap-2">
        <div
          onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
          className="flex w-fit cursor-pointer items-center gap-2 whitespace-nowrap font-medium underline-offset-2 hover:underline"
        >
          <ProfileImg size={profileSize} src={profileImg} label={false} />
          <div className="relative">
            <p>{nickname}</p>
            {isProfileMenuOpened && (
              <Dropdown
                options={profileOptions}
                className="left-0 top-6 whitespace-nowrap text-base"
              />
            )}
          </div>
        </div>

        {chatIcon && (
          <Link href={`/chat/${instructorId}`}>
            <ChatSVG
              fill="black"
              width="17"
              height="17"
              className="cursor-pointer"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default InstructorProfileMenu;

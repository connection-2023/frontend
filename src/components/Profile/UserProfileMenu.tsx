'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/Profile/ProfileImage';

interface UserProfileMenuProps {
  contact: number | string;
  userId: number | string;
  profileImg: string | null;
  name: string;
  nameWidth?: number;
}

const UserProfileMenu = (props: UserProfileMenuProps) => {
  const { userId, name, contact, profileImg, nameWidth } = props;
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
  const listRef = useRef(null);

  useClickAway(listRef, () => {
    setIsProfileMenuOpened(false);
  });
  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(String(contact)).then(() => {
      toast.success('연락처가 복사되었습니다!');
    });
  };
  const profileOptions = [
    {
      component: <p>연락처 복사</p>,
      onClick: handleCopyPhoneNumber,
    },
    {
      component: <Link href={`/chat/${userId}`}>채팅하기</Link>,
    },
    {
      component: (
        <Link href={`/report?targetUserId=${userId}`} prefetch={false}>
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
    <div className="flex items-center gap-2" ref={listRef}>
      <div
        onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
        className="cursor-pointer"
      >
        <ProfileImg size="small" src={profileImg} label={false} />
      </div>

      <div className="relative">
        <button
          style={{ width: nameWidth ? `${nameWidth}px` : undefined }}
          className="truncate text-left"
          onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
        >
          {name}
        </button>

        {isProfileMenuOpened && (
          <Dropdown
            options={profileOptions}
            className="left-0 top-6 whitespace-nowrap text-base"
          />
        )}
      </div>
    </div>
  );
};

export default UserProfileMenu;

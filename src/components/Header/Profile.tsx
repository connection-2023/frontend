'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ArrowDownSVG, ProfileSVG } from '@/icons/svg';
import useSession from '@/lib/useSession';
import ProfileMenu from './ProfileMenu';

const Profile = () => {
  const user = useSession();
  const profileImg = user?.userProfileImage?.imageUrl || null;
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const menuRef = useRef(null);

  useClickAway(menuRef, () => {
    setIsProfileMenu(false);
  });

  const userMenuHandler = () => {
    setIsProfileMenu((prev) => !prev);
  };

  return (
    <div className="relative w-[4.8125rem]" ref={menuRef}>
      <div
        onClick={userMenuHandler}
        className="absolute -top-10 flex h-12 w-full cursor-pointer items-center justify-center rounded-[3.125rem] bg-white shadow-horizontal"
      >
        <div className="relative ml-1.5 h-[2.45rem] w-[2.45rem] overflow-hidden rounded-full">
          {profileImg ? (
            <Image
              src={profileImg}
              fill
              alt="사용자 프로필 이미지"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <ProfileSVG />
          )}
        </div>
        <ArrowDownSVG
          className={` fill-black ${
            isProfileMenu ? 'rotate-180 transform' : '-translate-x-0.5'
          } `}
        />
      </div>

      {isProfileMenu && <ProfileMenu />}
    </div>
  );
};

export default Profile;

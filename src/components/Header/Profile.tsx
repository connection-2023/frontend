'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ArrowDownSVG, ProfileSVG } from '@/icons/svg';
import useSession from '@/lib/useSession';
import ProfileMenu from './ProfileMenu';
import ProfileImage from '@/components/ProfileImage/ProfileImage';

const Profile = ({ handleLogout }: { handleLogout: () => void }) => {
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
        <div className="relative ml-1.5 overflow-hidden rounded-full">
          <ProfileImage size="small" src={profileImg} label={false} />
        </div>
        <ArrowDownSVG
          className={` fill-black ${
            isProfileMenu ? 'rotate-180 transform' : '-translate-x-0.5'
          } `}
        />
      </div>

      {isProfileMenu && <ProfileMenu handleLogout={handleLogout} />}
    </div>
  );
};

export default Profile;

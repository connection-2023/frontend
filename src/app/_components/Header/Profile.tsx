'use client';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ArrowDownSVG } from '@/icons/svg';
import { useUserStore } from '@/store';
import { useScrollStore } from '@/store/scrollStore';
import ProfileMenu from './ProfileMenu';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { instructorProfile, userProfile } from '@/types/auth';

const Profile = ({
  defaultProfileImg,
}: {
  defaultProfileImg: string | null;
}) => {
  const userStoreState = useUserStore();
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const { isScrollingUp } = useScrollStore();

  useEffect(() => {
    if (!isScrollingUp) {
      setIsProfileMenu(false);
    }
  }, [isScrollingUp]);

  useClickAway(menuRef, () => {
    setIsProfileMenu(false);
  });

  const userMenuHandler = () => {
    setIsProfileMenu((prev) => !prev);
  };

  const profileImg =
    userStoreState.userType === 'user'
      ? (userStoreState.authUser as userProfile)?.userProfileImage?.imageUrl
      : (userStoreState.authUser as instructorProfile)?.profileCardImageUrl;

  return (
    <div className="relative hidden w-[4.8125rem] sm:block" ref={menuRef}>
      <div
        onClick={userMenuHandler}
        className="absolute -top-10 flex h-12 w-full cursor-pointer items-center justify-center rounded-[3.125rem] bg-white shadow-horizontal "
      >
        <div className="relative ml-1.5 overflow-hidden rounded-full">
          <ProfileImage
            size="small"
            src={userStoreState.userType ? profileImg : defaultProfileImg}
            label={false}
          />
        </div>
        <ArrowDownSVG
          className={`h-[34px] w-[34px] fill-black ${
            isProfileMenu ? 'rotate-180 transform' : '-translate-x-0.5'
          } `}
        />
      </div>

      {isProfileMenu && <ProfileMenu />}
    </div>
  );
};

export default Profile;
{
  /* <div
onClick={userMenuHandler}
className={`absolute -top-9 flex items-center justify-center ${
  isProfileMenu
    ? 'rounded-full border-4 border-solid border-main-color'
    : 'p-1'
}  md:hidden`}
>
<ProfileImage
  size="small"
  src={userStoreState.userType ? profileImg : defaultProfileImg}
  label={false}
/>
</div> */
}

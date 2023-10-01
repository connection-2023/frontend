'use client';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import Image from 'next/image';
import ProfileMenu from './ProfileMenu';
import { dummyUserInfo } from '@/constants/dummy';
import { ArrowDownSVG, ProfileSVG } from '../../../public/icons/svg';

const Profile = () => {
  const { profileImg } = dummyUserInfo;

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
        className="absolute -top-10 flex h-12 w-full cursor-pointer items-center justify-center rounded-[3.125rem] bg-white shadow-[1px_1px_4px_1px_rgba(0,0,0,0.25)]"
      >
        <div className="relative ml-1.5 h-[2.45rem] w-[2.45rem] overflow-hidden rounded-full">
          {profileImg ? (
            <Image
              src="https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg"
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
{
  /* <div className="text-lg">
  <Link href="signin">로그인</Link>/<Link href="signup">회원가입</Link>
</div> */
} // 로그인 비활성화

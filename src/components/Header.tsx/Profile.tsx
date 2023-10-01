'use client';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import Image from 'next/image';
import { ArrowDownSVG, TransFormSVG } from '../../../public/icons/svg';

const Profile = () => {
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
          <Image
            src="https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg"
            fill
            alt="사용자 프로필 이미지"
            style={{ objectFit: 'cover' }}
          />
          {/* <ProfileSVG /> */}
        </div>
        <ArrowDownSVG
          className={` fill-black ${
            isProfileMenu ? 'rotate-180 transform' : '-translate-x-1'
          } `}
        />
      </div>

      {isProfileMenu && (
        <ul className="absolute right-0 top-3 inline-flex w-[9.4375rem] flex-col bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <li className="my-4 ml-4 font-bold">sss님</li>
          <li className="mb-3 ml-4">마이 페이지</li>
          <li className="mb-3 ml-4">관심 클래스</li>
          <li className="mb-4 ml-4">예약 현황</li>

          <li className="flex gap-1 border-t border-solid border-sub-color2 py-4 pl-4 text-main-color">
            <TransFormSVG />
            강사 전환
          </li>

          <li className="bg-gray-200 py-2 pl-4 text-[#B6B6B6]">로그아웃</li>
        </ul>
      )}
    </div>
  );
};

export default Profile;

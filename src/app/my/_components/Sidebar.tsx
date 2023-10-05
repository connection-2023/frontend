'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpSVG, ProfileSVG } from '../../../../public/icons/svg';

interface ISidebar {
  profileImg?: string;
  nickname?: string;
}

const links = [
  { path: '/my/dashboard', text: '대시보드' },
  {
    path: '/my/manage/schedule',
    text: '클래스 관리',
    submenuItems: [
      { path: '/my/manage/schedule', text: '수업 일정' },
      { path: '/my/manage/myclass', text: '내 클래스' },
      { path: '/my/manage/member', text: '회원 관리' },
      { path: '/my/manage/review', text: '리뷰 관리' },
    ],
  },
  { path: '/my/pass-coupon', text: '패스권/쿠폰' },
  { path: '/my/income', text: '수입 관리' },
  { path: '/my/report', text: '신고내역' },
  { path: '/my/info', text: '내 정보' },
];

const userLinks = [
  { path: '/my/info', text: '내 정보' },

  {
    path: '/my/class/apply',
    text: '내 클래스',
    submenuItems: [
      { path: '/my/class/apply', text: '신청한 클래스' },
      { path: '/my/class/myclass', text: '관심 클래스' },
      { path: '/my/class/member', text: '클래스 후기' },
    ],
  },
  { path: '/my/instructor', text: '관심/차단 강사' },
  { path: '/my/pass-coupon', text: '패스권/쿠폰' },
  { path: '/my/pay-hisotry', text: '결제 내역' },
  { path: '/my/report', text: '신고내역' },
];

const Sidebar = ({
  nickname = '리아킴',
  profileImg = 'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
}: ISidebar) => {
  const pathname = usePathname();
  const isSubmenuActive = Boolean(
    links.find(
      (link) =>
        link.submenuItems &&
        link.submenuItems.some((item) => item.path === pathname),
    ),
  );
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  const getTextColorClass = (path: string) =>
    pathname.includes(path)
      ? 'text-sub-color3'
      : 'text-sub-color2 hover:text-sub-color3';

  return (
    <aside className="mt-[1.38rem] flex flex-col items-start whitespace-nowrap px-[4.38rem]">
      <div className="mb-4 flex flex-col items-start">
        <div className="relative mb-4 h-[101px] w-[101px] rounded-full">
          {profileImg ? (
            <Image
              src={profileImg}
              fill
              alt="사용자 프로필 이미지"
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          ) : (
            <ProfileSVG />
          )}
        </div>
        <p className="text-2xl font-bold text-sub-color3">{nickname}님</p>
      </div>

      <ul className="flex flex-col gap-6 text-lg font-semibold">
        {links.map((link) => (
          <li key={link.path} className={getTextColorClass(link.path)}>
            <Link href={link.path} className="flex items-center">
              {link.text}

              {link.text === '클래스 관리' &&
                (isOpen ? (
                  <ArrowUpSVG
                    onClick={() => setIsOpen(!isOpen)}
                    className="fill-sub-color1"
                  />
                ) : (
                  <ArrowUpSVG
                    onClick={() => setIsOpen(!isOpen)}
                    className="origin-center rotate-180 fill-sub-color2"
                  />
                ))}
            </Link>

            {link.submenuItems && (
              <ul
                className={`${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                } ml-2 flex flex-col gap-[0.62rem] transition-all duration-300 ease-linear `}
              >
                {link.submenuItems.map((item) => (
                  <li key={item.path} className={getTextColorClass(item.path)}>
                    <Link href={item.path}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

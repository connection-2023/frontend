'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowUpSVG,
  BookmarkSVG,
  CouponSVG,
  DashboardSVG,
  ProfileSVG,
  ReportSVG,
  MoneySVG,
  HeartSVG,
} from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import ProfileImage from '@/components/ProfileImage/ProfileImage';

interface SidebarProps {
  view?: 'my' | 'dashboard';
  profileImg?: string;
  nickname?: string;
}

const Sidebar = ({
  view = 'my',
  nickname = '리아킴',
  profileImg = 'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
}: SidebarProps) => {
  const pathname = usePathname();
  const { userType } = useUserStore();
  const isUser = userType === 'user';
  const isSubmenuActive = Boolean(
    instructorLinks.find(
      (link) =>
        link.submenuItems &&
        link.submenuItems.some((item) => item.path === pathname),
    ),
  );
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  const getTextColorClass = (path: string) =>
    pathname.includes(path)
      ? 'text-gray-100'
      : 'text-gray-500 hover:text-gray-100';

  return (
    <nav
      className={`flex h-full flex-col items-start whitespace-nowrap rounded-lg bg-white ${
        view === 'my' ? 'max-w-[19.5rem] px-4 py-10' : 'w-full'
      }`}
    >
      <div
        className={`mb-6 flex items-center gap-2 ${
          view === 'dashboard' && 'h-[3.3rem] w-full bg-gray-900 px-4'
        }`}
      >
        <ProfileImage size="small" src={profileImg} label={false} />

        <p className="text-lg font-bold text-gray-100">{nickname}님</p>
      </div>

      <ul
        className={`flex flex-col gap-5 text-lg font-semibold ${
          view === 'dashboard' && 'px-4'
        }`}
      >
        {(isUser ? userLinks : instructorLinks).map((link) => (
          <li key={link.path} className={getTextColorClass(link.path)}>
            <div className="flex items-center">
              <Link href={link.path} className="group flex items-center">
                {link.icon}
                {link.text}
              </Link>

              {link.text === '클래스 관리' ||
                (link.text === '내 클래스' &&
                  (isOpen ? (
                    <button onClick={() => setIsOpen(!isOpen)}>
                      <ArrowUpSVG
                        width="34"
                        height="34"
                        className="fill-sub-color1"
                      />
                    </button>
                  ) : (
                    <button onClick={() => setIsOpen(!isOpen)}>
                      <ArrowUpSVG
                        width="34"
                        height="34"
                        className="origin-center rotate-180 fill-gray-500"
                      />
                    </button>
                  )))}
            </div>

            {link.submenuItems && (
              <ul
                className={`${
                  isOpen ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                } ml-[2rem] flex flex-col gap-[0.62rem] transition-all duration-300 ease-linear`}
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
    </nav>
  );
};

export default Sidebar;

const iconStyle =
  'mr-[0.63rem] fill-stroke-gray-500 stroke-gray-500 group-hover:fill-stroke-sub-color1 group-hover:stroke-sub-color1 group-focus:fill-stroke-sub-color1 group-focus:stroke-sub-color1';

const instructorLinks = [
  {
    path: '/my/dashboard',
    text: '대시보드',
    icon: <DashboardSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/my/manage/schedule',
    text: '클래스 관리',
    icon: <BookmarkSVG width="21" height="21" className={iconStyle} />,
    submenuItems: [
      { path: '/my/manage/schedule', text: '수업 일정' },
      { path: '/my/manage/myclass', text: '내 클래스' },
      { path: '/my/manage/member', text: '회원 관리' },
      { path: '/my/manage/review', text: '리뷰 관리' },
    ],
  },
  {
    path: '/my/lecturer/coupon-pass?state=coupon',
    text: '패스권/쿠폰',
    icon: <CouponSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/my/income',
    text: '수익 관리',
    icon: <MoneySVG width="19" height="19" className={iconStyle} />,
  },
  {
    path: '/my/report',
    text: '신고내역',
    icon: <ReportSVG width="20" height="20" className={iconStyle} />,
  },
  {
    path: '/my/info',
    text: '내 정보',
    icon: <ProfileSVG width="21" height="21" className={iconStyle} />,
  },
];

const userLinks = [
  {
    path: '/my/info',
    text: '내 정보',
    icon: <ProfileSVG width="21" height="21" className={iconStyle} />,
  },

  {
    path: '/my/class/apply',
    text: '내 클래스',
    icon: <BookmarkSVG width="21" height="21" className={iconStyle} />,
    submenuItems: [
      { path: '/my/class/apply', text: '신청한 클래스' },
      { path: '/my/class/myclass', text: '관심 클래스' },
      { path: '/my/class/member', text: '클래스 후기' },
    ],
  },
  {
    path: '/my/instructor',
    text: '관심/차단 강사',
    icon: <HeartSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/my/user/coupon-pass?state=coupon',
    text: '패스권/쿠폰',
    icon: <CouponSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/my/payment-hisotry',
    text: '결제 내역',
    icon: <MoneySVG width="19" height="19" className={iconStyle} />,
  },
  {
    path: '/my/report',
    text: '신고내역',
    icon: <ReportSVG width="20" height="20" className={iconStyle} />,
  },
];

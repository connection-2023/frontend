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
}

const Sidebar = ({ view = 'my' }: SidebarProps) => {
  const pathname = usePathname();
  const isSubmenuActive = Boolean(
    instructorLinks.find(
      (link) =>
        link.submenuItems &&
        link.submenuItems.some((item) => item.path === pathname),
    ),
  );
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  const { userType, authUser } = useUserStore();
  const isUser = userType === 'user';
  if (!authUser) return null;
  const { nickname } = authUser;
  const profileImg = authUser.profileImage;

  const getTextColorClass = (path: string) =>
    pathname.includes(path)
      ? 'w-fit text-gray-100'
      : 'w-fit text-gray-500 hover:text-gray-100';

  return (
    <nav
      className={`flex h-full flex-col items-start whitespace-nowrap rounded-lg bg-white ${
        view === 'my' ? 'max-w-[19.5rem] px-9 py-5' : 'w-full'
      }`}
    >
      {isUser ? (
        <div className="mb-5">
          <ProfileImage size="large" src={profileImg} label={false} />

          <p className="mt-4 text-lg font-bold text-gray-100">{nickname}님</p>
        </div>
      ) : (
        <div
          className={`mb-6 flex items-center gap-2 ${
            view === 'dashboard' && 'h-[3.3rem] w-full bg-gray-900 px-4'
          }`}
        >
          <ProfileImage size="small" src={profileImg} label={false} />

          <p className="text-lg font-bold text-gray-100">{nickname}</p>
        </div>
      )}

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

              {link.submenuItems &&
                (isOpen ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="내 클래스 메뉴 닫기"
                  >
                    <ArrowUpSVG
                      width="34"
                      height="34"
                      className="fill-sub-color1"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="내 클래스 메뉴 열기"
                  >
                    <ArrowUpSVG
                      width="34"
                      height="34"
                      className="origin-center rotate-180 fill-gray-500"
                    />
                  </button>
                ))}
            </div>

            {link.submenuItems && (
              <ul
                className={`${
                  isOpen
                    ? 'mt-2 max-h-48 opacity-100'
                    : 'hidden max-h-0 opacity-0'
                } ml-8 flex flex-col gap-2.5 transition-all duration-300 ease-linear`}
              >
                {link.submenuItems.map((item) => (
                  <li key={item.path} className={getTextColorClass(item.path)}>
                    <Link href={item.path} className="group flex items-center">
                      {item.text}
                    </Link>
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
  'mr-2.5 fill-gray-500 stroke-gray-500 group-hover:fill-stroke-sub-color1 group-hover:stroke-sub-color1 group-focus:fill-stroke-sub-color1 group-focus:stroke-sub-color1';

const instructorLinks = [
  {
    path: '/dashboard',
    text: '대시보드',
    icon: <DashboardSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/mypage/instructor/manage/approval-pending',
    text: '내 클래스',
    icon: <BookmarkSVG width="21" height="21" className={iconStyle} />,
    submenuItems: [
      { path: '/mypage/instructor/manage/schedule', text: '수업 일정' },
      { path: '/mypage/instructor/manage/myclass', text: '내 클래스' },
      { path: '/mypage/instructor/manage/member', text: '회원 관리' },
      { path: '/mypage/instructor/manage/review', text: '리뷰 관리' },
    ],
  },
  {
    path: '/mypage/instructor/coupon-pass?state=coupon',
    text: '패스권/쿠폰',
    icon: <CouponSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/mypage/instructor/income',
    text: '수익 관리',
    icon: <MoneySVG width="19" height="19" className={iconStyle} />,
  },
  {
    path: '/mypage/instructor/report',
    text: '신고내역',
    icon: <ReportSVG width="20" height="20" className={iconStyle} />,
  },
  {
    path: '/mypage/instructor/info',
    text: '내 정보',
    icon: <ProfileSVG width="21" height="21" className={iconStyle} />,
  },
];

const userLinks = [
  {
    path: '/mypage/user/info',
    text: '내 정보',
    icon: <ProfileSVG width="21" height="21" className={iconStyle} />,
  },

  {
    path: '/mypage/user/myclass/apply',
    text: '내 클래스',
    icon: <BookmarkSVG width="21" height="21" className={iconStyle} />,
    submenuItems: [
      { path: '/mypage/user/myclass/apply', text: '신청한 클래스' },
      { path: '/mypage/user/myclass/myclass', text: '관심 클래스' },
      { path: '/mypage/user/myclass/member', text: '클래스 후기' },
    ],
  },
  {
    path: '/mypage/user/instructor',
    text: '관심/차단 강사',
    icon: (
      <HeartSVG
        width="21"
        height="21"
        className="group-hover:fill-stroke-sub-color1 group-focus:fill-stroke-sub-color1 mr-2.5 stroke-gray-500 stroke-[3px] group-hover:stroke-sub-color1 group-focus:stroke-sub-color1"
      />
    ),
  },
  {
    path: '/mypage/user/coupon',
    text: '패스권/쿠폰',
    icon: <CouponSVG width="21" height="21" className={iconStyle} />,
  },
  {
    path: '/mypage/user/payment-hisotry',
    text: '결제 내역',
    icon: <MoneySVG width="19" height="19" className={iconStyle} />,
  },
  {
    path: '/mypage/user/report',
    text: '신고내역',
    icon: <ReportSVG width="20" height="20" className={iconStyle} />,
  },
];

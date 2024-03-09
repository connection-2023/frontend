'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HIDE_NAV_PATH } from '@/constants/constants';
import {
  HamburgerSVG,
  BookmarkSVG,
  HomeSVG,
  BasicCalendarSVG,
  EditSVG,
  UnFilledNoteSVG,
  LogInSVG,
} from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import { useActivePath } from '@/utils/hooks/useActivePath';

const MobileNav = () => {
  const [showNav, setShowNav] = useState(true);
  const pathname = usePathname();
  const { userType } = useUserStore();
  const isUser = userType !== null;
  const isLecturer = userType === 'lecturer';
  const checkActivePath = useActivePath();

  useEffect(() => {
    const shouldHideNav = HIDE_NAV_PATH.some((path) =>
      new RegExp(path).test(pathname),
    );

    setShowNav(!shouldHideNav);
  }, [pathname]);

  const getTextColor = (path: string) =>
    checkActivePath(path) ? 'text-black' : 'text-gray-300  hover:text-black';

  const getIconColor = (path: string) =>
    checkActivePath(path)
      ? 'fill-black'
      : 'fill-gray-500 group-hover:fill-black';

  const NAV_LINKS = [
    {
      href: '/class',
      icon: (
        <BookmarkSVG
          width="24"
          height="24"
          className={getIconColor('/class')}
        />
      ),
      label: '클래스',
    },
    {
      href: '/instructor',
      icon: (
        <UnFilledNoteSVG
          width="24"
          height="24"
          className={
            checkActivePath('/instructor')
              ? 'stroke-black stroke-2'
              : 'stroke-gray-500 stroke-2 group-hover:stroke-black'
          }
        />
      ),
      label: '강사',
    },
    {
      href: '/',
      icon: <HomeSVG width="24" height="24" className="fill-main-color" />,
      label: '홈',
    },
    {
      href: isLecturer ? '/class/create' : '/mypage/user/myclass/apply',
      icon: isLecturer ? (
        <EditSVG
          width="20"
          height="20"
          className={getIconColor('/class/create')}
        />
      ) : (
        <BasicCalendarSVG
          width="24"
          height="24"
          className={getIconColor('/mypage/user/myclass/apply')}
        />
      ),
      label: isLecturer ? '등록' : '내 클래스',
    },
    {
      href: isUser ? '/more' : '/login',
      icon: isUser ? (
        <HamburgerSVG
          width="24"
          height="24"
          className={getIconColor('/more')}
        />
      ) : (
        <LogInSVG width="24" height="24" className={getIconColor('login')} />
      ),
      label: isUser ? '더보기' : '로그인',
    },
  ];

  return showNav ? (
    <nav className="fixed bottom-0 left-0 z-40 h-24 w-full border-t border-solid border-gray-700 bg-white px-4 pb-10 pt-3 sm:hidden">
      <ul className="flex justify-around">
        {NAV_LINKS.map(({ href, icon, label }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={
                'group line-clamp-1 flex flex-col items-center justify-center gap-1.5 text-sm font-medium' +
                ' ' +
                getTextColor(href)
              }
            >
              <div className="h-6">{icon}</div>
              <label>{label}</label>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};

export default MobileNav;

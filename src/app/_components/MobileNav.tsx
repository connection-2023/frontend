'use client';
import Link from 'next/link';
import {
  HamburgerSVG,
  BookmarkSVG,
  HomeSVG,
  ProfileNoStrokeSVG,
  EditSVG,
  UnFilledNoteSVG,
} from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import { useActivePath } from '@/utils/hooks/useActivePath';

const MobileNav = () => {
  const { userType } = useUserStore();
  const isUser = userType === 'user';
  const checkActivePath = useActivePath();

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
        <ProfileNoStrokeSVG
          width="24"
          height="24"
          className={
            checkActivePath('/mypage/user/myclass/apply')
              ? 'fill-black stroke-black'
              : 'fill-gray-500 stroke-gray-500 group-hover:fill-black group-hover:stroke-black'
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
      href: isUser ? '/mypage/user/myclass/apply' : '/class/create',
      icon: isUser ? (
        <UnFilledNoteSVG
          width="24"
          height="24"
          className={
            checkActivePath('/mypage/user/myclass/apply')
              ? 'stroke-black stroke-2'
              : 'stroke-gray-500 stroke-2'
          }
        />
      ) : (
        <EditSVG
          width="20"
          height="20"
          className={getIconColor('/class/create')}
        />
      ),
      label: isUser ? '내 클래스' : '등록',
    },
    {
      href: '/more',
      icon: (
        <HamburgerSVG
          width="24"
          height="24"
          className={getIconColor('/more')}
        />
      ),
      label: '더보기',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 h-24 w-full border-t border-solid border-gray-700 bg-white px-4 pb-10 pt-3 sm:hidden">
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
  );
};

export default MobileNav;

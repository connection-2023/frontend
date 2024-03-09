import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ConnectionLogoSVG,
  MapSVG,
  SmallLogoSVG,
  HamburgerSVG,
} from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import Sidebar from '../Sidebar';
import SidebarModal from '@/components/Modal/SidebarModal';

const USER_MENU = [
  { href: 'instructor', menu: '강사', label: '강사 페이지로 이동' },
  { href: 'class', menu: '클래스', label: '클래스 페이지로 이동' },
  { href: 'pass', menu: '패스권', label: '패스권 페이지로 이동' },
  { href: '', menu: <MapSVG />, label: '내 주변 클래스 보기' },
];

const LECTURER_MENU = [
  { href: 'instructor', menu: '강사', label: '강사 페이지로 이동' },
  { href: 'class', menu: '클래스', label: '클래스 페이지로 이동' },
  {
    href: 'class/create/drafts',
    menu: '클래스 등록',
    label: '클래스 등록 페이지로 이동',
  },
];

const getClassName = (href: string, pathname: string, menuList: Array<any>) => {
  const isSubmenu = menuList.some(
    (menu) => menu.href !== href && menu.href.startsWith(href),
  );

  if (isSubmenu && pathname.startsWith(`/${href}/`)) return '';

  if (pathname.startsWith(`/${href}`)) return 'font-bold';

  return '';
};

const HeaderMenu = () => {
  const pathname = usePathname();
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));
  const mySidebar =
    pathname.includes('mypage') || pathname.includes('dashboard');
  const [isOpened, setIsOpened] = useState(false);

  const handleOpened = () => {
    setIsOpened(!isOpened);
  };

  const menuList = userType === 'lecturer' ? LECTURER_MENU : USER_MENU;

  return (
    <>
      <nav className="flex items-center">
        <button
          onClick={handleOpened}
          className={mySidebar ? 'hidden md:block xl:hidden' : 'hidden'}
          aria-label="마이페이지 사이드바"
        >
          <HamburgerSVG
            width="28"
            height="28"
            className="mr-2.5 cursor-pointer fill-gray-100"
          />
        </button>

        <Link
          href="/"
          aria-label="홈으로 이동"
          className="flex h-8 items-center"
        >
          <ConnectionLogoSVG className="mr-6 block h-4 w-36 translate-y-1 sm:hidden md:block md:h-[1.375rem] md:w-[12.6875rem] md:translate-y-0" />
          <SmallLogoSVG
            width="44"
            height="22"
            className="mr-4 hidden sm:block md:hidden"
          />
        </Link>

        <h1 className="text-0 overflow-hidden indent-[-9999px]">
          Connection 댄스 플랫폼
        </h1>

        <h2 className="text-0 overflow-hidden indent-[-9999px]">
          Connection 서비스 주요 메뉴
        </h2>
        <ul className="hidden gap-6 text-lg sm:flex">
          {menuList.map(({ href, menu, label }, index) => {
            const className = getClassName(href, pathname, menuList);

            return (
              <li key={`${href}${index}`} className={className}>
                <Link href={`/${href}`} aria-label={label}>
                  {menu}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <SidebarModal isOpened={isOpened} handleClosed={() => setIsOpened(false)}>
        <Sidebar />
      </SidebarModal>
    </>
  );
};

export default HeaderMenu;

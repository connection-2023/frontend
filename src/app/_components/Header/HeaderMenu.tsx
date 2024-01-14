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
  { href: '/instructor', menu: '강사' },
  { href: '/class', menu: '클래스' },
  { href: '/', menu: '패스권' },
  { href: '/', menu: <MapSVG /> },
];

const LECTURER_MENU = [
  { href: '/instructor', menu: '강사' },
  { href: '/class', menu: '클래스' },
  { href: '/class/create', menu: '클래스 등록' },
];

const HeaderMenu = () => {
  const pathname = usePathname();
  const { userType } = useUserStore();
  const mySidebar =
    pathname.startsWith('/mypage') || pathname.startsWith('/dashboard');
  const [isOpened, setIsOpened] = useState(false);

  const handleOpened = () => {
    setIsOpened(!isOpened);
  };

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

        <Link href="/" className="mr-6" aria-label="홈으로 이동">
          <ConnectionLogoSVG className="block h-4 w-36 translate-y-1 sm:hidden md:block md:h-[1.375rem] md:w-[12.6875rem] md:translate-y-0" />
          <SmallLogoSVG className="hidden h-5 w-11 translate-x-5 translate-y-1 sm:block md:hidden" />
        </Link>

        <h1 className="text-0 overflow-hidden indent-[-9999px]">
          Connection 댄스 플랫폼
        </h1>

        <h2 className="text-0 overflow-hidden indent-[-9999px]">
          Connection 서비스 주요 메뉴
        </h2>
        <ul className="hidden gap-6 text-lg sm:flex">
          {(userType === 'lecturer' ? LECTURER_MENU : USER_MENU).map(
            ({ href, menu }, index) => (
              <li
                key={href + index}
                className={pathname === href ? 'font-bold' : ''}
              >
                <Link href={href}>{menu}</Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <SidebarModal isOpened={isOpened} handleClosed={() => setIsOpened(false)}>
        <Sidebar />
      </SidebarModal>
    </>
  );
};

export default HeaderMenu;

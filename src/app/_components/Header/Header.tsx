'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  NON_STICKY_HEADER_PATHS,
  NO_HEADER_FOOTER_PATHS,
} from '@/constants/constants';
import { useScrollStore } from '@/store/scrollStore';
import { useUserStore } from '@/store/userStore';
import HeaderMenu from './HeaderMenu';

const Header = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastScrollTopRef = useRef(0);

  const { userType } = useUserStore();
  const { isScrollingUp, setIsScrollingUp } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop <= 100) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(lastScrollTopRef.current > currentScrollTop);
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderStyle = (isStickyHeader: boolean) => {
    const baseStyle = `${
      isScrollingUp
        ? 'translate-y-0'
        : pathname.startsWith('/mypage') && userType === 'lecturer'
          ? '-translate-y-full xl:translate-y-0'
          : '-translate-y-full'
    } ${
      pathname.startsWith('/mypage') &&
      userType === 'lecturer' &&
      'sticky xl:bg-sub-color1-transparent xl:px-9 xl:pb-0 xl:pt-12 xl:relative'
    } z-header top-0 duration-[300ms] mx-auto w-full`;
    return isStickyHeader ? `${baseStyle} relative ` : `${baseStyle} sticky`;
  };

  const isPathInList = (pathList: string[]) =>
    pathList.some((path: string) => {
      if (path === '/search') {
        return pathname === '/search' && !searchParams.get('query');
      }
      return pathname.startsWith(path);
    });

  const isStickyHeader = isPathInList(NON_STICKY_HEADER_PATHS);
  const shouldRenderHeader = isPathInList(NO_HEADER_FOOTER_PATHS);

  return !shouldRenderHeader ? (
    <header className={getHeaderStyle(isStickyHeader)}>
      <div
        className={` ${
          pathname.startsWith('/mypage') &&
          userType === 'lecturer' &&
          'xl:relative xl:h-[6rem] xl:w-full xl:items-center xl:rounded-lg xl:bg-white xl:px-4 xl:pb-0'
        } flex h-[5.6rem] items-end justify-between whitespace-nowrap bg-white/[.95] px-4 pb-3 backdrop-blur-sm md:h-[7.6rem] md:px-16 md:pb-5`}
      >
        <HeaderMenu />
        {children}
      </div>
    </header>
  ) : null;
};

export default Header;

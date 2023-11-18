'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  NON_STICKY_HEADER_PATHS,
  NO_HEADER_FOOTER_PATHS,
} from '@/constants/constants';
import HeaderMenu from './HeaderMenu';

const Header = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lastScrollTopRef = useRef(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

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
        ? 'translate-y-0 duration-[300ms]'
        : '-translate-y-full duration-[300ms]'
    } whitespace-nowrap top-0 z-header pb-3 px-4 mx-auto flex h-[5.6rem] md:h-[7.6rem] w-screen items-end justify-between bg-white/[.95] md:px-16 md:pb-5 backdrop-blur-sm `;
    return isStickyHeader ? `${baseStyle} relative ` : `${baseStyle} sticky`;
  };

  const isPathInList = (pathList: string[]) =>
    pathList.some((path: string) => pathname.startsWith(path));

  const isStickyHeader = isPathInList(NON_STICKY_HEADER_PATHS);
  const shouldRenderHeader = isPathInList(NO_HEADER_FOOTER_PATHS);

  return !shouldRenderHeader ? (
    <header className={getHeaderStyle(isStickyHeader)}>
      <HeaderMenu />
      {children}
    </header>
  ) : null;
};

export default Header;

'use client';
import { usePathname } from 'next/navigation';
import HeaderMenu from './HeaderMenu';
import UserProfileLinks from './UserProfileLinks';
import {
  NON_STICKY_HEADER_PATHS,
  NO_HEADER_PATHS,
} from '@/constants/constants';

const Header = () => {
  const pathname = usePathname();

  const getHeaderStyle = (isStickyHeader: boolean) => {
    const baseStyle =
      'top-0 z-10 mx-auto flex h-[7.6rem] w-screen max-w-[1440px] items-end justify-between bg-white/[.95] px-16 pb-5 backdrop-blur-sm';
    return isStickyHeader ? `${baseStyle} relative` : `${baseStyle} sticky`;
  };

  const isPathInList = (pathList: string[]) =>
    pathList.some((path: string) => pathname.startsWith(path));

  const isStickyHeader = isPathInList(NON_STICKY_HEADER_PATHS);
  const shouldRenderHeader = isPathInList(NO_HEADER_PATHS);

  return !shouldRenderHeader ? (
    <header className={getHeaderStyle(isStickyHeader)}>
      <HeaderMenu />
      <UserProfileLinks />
    </header>
  ) : null;
};

export default Header;

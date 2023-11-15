'use client';
import { usePathname } from 'next/navigation';
import {
  NON_STICKY_HEADER_PATHS,
  NO_HEADER_FOOTER_PATHS,
} from '@/constants/constants';
import HeaderMenu from './HeaderMenu';
import UserProfileLinks from './UserProfileLinks';

const Header = () => {
  const pathname = usePathname();

  const getHeaderStyle = (isStickyHeader: boolean) => {
    const baseStyle =
      'top-0 z-header pb-3 px-4 mx-auto flex h-[5.6rem] md:h-[7.6rem] w-screen items-end justify-between bg-white/[.95] md:px-16 md:pb-5 backdrop-blur-sm';
    return isStickyHeader ? `${baseStyle} relative` : `${baseStyle} sticky`;
  };

  const isPathInList = (pathList: string[]) =>
    pathList.some((path: string) => pathname.startsWith(path));

  const isStickyHeader = isPathInList(NON_STICKY_HEADER_PATHS);
  const shouldRenderHeader = isPathInList(NO_HEADER_FOOTER_PATHS);

  return !shouldRenderHeader ? (
    <header className={getHeaderStyle(isStickyHeader)}>
      <HeaderMenu />
      <UserProfileLinks />
    </header>
  ) : null;
};

export default Header;

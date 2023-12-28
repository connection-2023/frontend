'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { NO_HEADER_FOOTER_PATHS } from '@/constants/constants';
import { ConnectionLogoSVG } from '@/icons/svg';

const Footer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shouldRenderFooter = NO_HEADER_FOOTER_PATHS.some((path: string) => {
    if (path === '/search') {
      return pathname === '/search' && !searchParams.get('query');
    }
    return pathname.startsWith(path);
  });

  return !shouldRenderFooter ? (
    <footer className="mx-auto w-full whitespace-pre-line break-keep border-t border-solid border-gray-700 px-[4.37rem] py-8 text-sm">
      <div className="mb-8 flex flex-wrap items-center gap-x-12 gap-y-4">
        <Link href="/">
          <ConnectionLogoSVG className="h-[0.875rem] w-[8.1875rem]" />
        </Link>

        <nav className="flex gap-12 text-sm font-bold">
          <Link href="/notice">공지사항</Link>
          <Link href="/help">이용약관</Link>
          <Link href="/help">개인정보처리방침</Link>
        </nav>
      </div>

      <p>(주)Connection | 통신판매번호 : 2023-서울송파-0000</p>
      <p>
        유료직업소개사업등록번호 : (국내) 제2023-0000000-00-0-00000호 |
        사업자등록번호 : 000-00-00000 | 00-000-0000
      </p>
      <p>©Connection, Inc.</p>
    </footer>
  ) : null;
};

export default Footer;

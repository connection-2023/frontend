import Link from 'next/link';
import { ConnectionLogoSVG, MapSVG } from '@/icons/svg';

const HeaderMenu = () => {
  return (
    <nav className="flex">
      <Link href="/" className="mr-6">
        <ConnectionLogoSVG className=" h-[1.375rem] w-[12.6875rem]" />
      </Link>
      <h1 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 댄스 플랫폼
      </h1>

      <ul className="flex gap-6 text-lg">
        <h2 className="text-0 overflow-hidden indent-[-9999px]">
          Connection 서비스 주요 메뉴
        </h2>
        <li>
          <Link href="/intructor">강사</Link>
        </li>
        <li>
          <Link href="/class">클래스</Link>
        </li>
        <li>
          <Link href="/">
            <MapSVG />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;

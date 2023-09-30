import Link from 'next/link';
import { ConnectionLogoSVG, MapSVG } from '../../../public/icons/svg';

const Menu = () => {
  return (
    <nav className="flex">
      <Link href={'/'} className="mr-6">
        <ConnectionLogoSVG className=" h-[1.375rem] w-[12.6875rem]" />
      </Link>
      <h1 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 댄스 플랫폼
      </h1>
      <ul className="flex gap-6 text-lg">
        <h2 className="text-0 overflow-hidden indent-[-9999px]">
          서비스 주요 메뉴
        </h2>
        <li>
          <Link href={'/'}>강사</Link>
        </li>
        <li>
          <Link href={'/'}>클래스</Link>
        </li>
        <li>
          <Link href={'/'}>
            <MapSVG />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

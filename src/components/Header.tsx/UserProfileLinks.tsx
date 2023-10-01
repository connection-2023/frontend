import Link from 'next/link';
import Profile from './Profile';
import { AlarmSVG, CommentSVG, SearchSVG } from '../../../public/icons/svg';

const UserProfileLinks = () => {
  return (
    <div className="flex items-end gap-3">
      <h2 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 유저 메뉴
      </h2>
      <Link href="/search">
        <SearchSVG className="h-[1.8rem] w-[1.8rem]" />
      </Link>
      <AlarmSVG className="pt-0.5" />
      <CommentSVG />
      <Profile />
    </div>
  );
};

export default UserProfileLinks;

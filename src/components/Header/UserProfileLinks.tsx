import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { dummyUserInfo } from '@/constants/dummy';
import { AlarmSVG, CommentSVG, SearchSVG } from '@/icons/svg';
import { getLogout } from '@/lib/apis/userApi';
import useSession from '@/lib/useSession';
import useStore from '@/store';
import Profile from './Profile';
import AuthModal from '@/components/Header/Auth/AuthModal';

const UserProfileLinks = () => {
  const { alarmCount, commentCount } = dummyUserInfo;
  const [isOpened, setIsOpened] = useState(false);

  const store = useStore();
  const user = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      const { status } = await getLogout();
      if (status === 200) toast.success('로그아웃 되었습니다!');
    } catch (error) {
      toast.error('로그아웃에 실패하였습니다!');
    } finally {
      store.reset();
      router.push('/');
    }
  };

  const handleOpened = () => {
    setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
  };

  return (
    <div className="flex items-end gap-3">
      <h2 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 유저 메뉴
      </h2>

      <Link href="/search">
        <SearchSVG className="h-[1.8rem] w-[1.8rem] fill-black" />
      </Link>

      {!user && (
        <div className="text-lg">
          <button onClick={handleOpened}>로그인/회원가입</button>
        </div>
      )}

      {user && (
        <>
          <button className="relative">
            <AlarmSVG className="pt-0.5" />
            <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
              {alarmCount}
            </span>
          </button>

          <button className="relative">
            <CommentSVG fill="black" width="29" height="30" />
            <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
              {commentCount}
            </span>
          </button>

          <Profile handleLogout={handleLogout} />
        </>
      )}

      {isOpened && <AuthModal isOpened={isOpened} isClosed={handleClosed} />}
    </div>
  );
};

export default UserProfileLinks;

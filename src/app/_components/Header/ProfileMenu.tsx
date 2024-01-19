import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TransFormSVG } from '@/icons/svg';
import { getInstructorProfile } from '@/lib/apis/instructorApi';
import {
  getSwitchUserRole,
  getLogout,
  getMyProfile,
  accessTokenReissuance,
} from '@/lib/apis/userApi';
import { useUserStore } from '@/store';

const ProfileMenu = () => {
  const store = useUserStore();
  const router = useRouter();
  const userType = useUserStore((state) => state.userType);

  const handleSwitchUser = async () => {
    if (!userType) return;

    const res = await getSwitchUserRole(userType);

    if (res.status !== 200) {
      if (store.userType === 'user' && res.status === 400) {
        router.push('/instructor/apply');
      } else {
        if (res.status === 401) {
          await accessTokenReissuance();
          await handleSwitchUser();
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
      return;
    }

    if (userType === 'user') {
      const instructorProfile = await getInstructorProfile();

      if (!instructorProfile) {
        toast.error('강사 프로필을 불러오는데 실패하였습니다');
        return;
      }

      store.setAuthUser(instructorProfile);
      store.setUserType('lecturer');
      router.push('/');
      toast.success('강사로 전환되었습니다!');
    } else {
      const response = await getMyProfile();
      const userProfile = response.data.myProfile;

      if (!userProfile) {
        toast.error('유저 프로필을 불러오는데 실패하였습니다');
        return;
      }
      store.setAuthUser(userProfile);
      store.setUserType('user');
      router.push('/');
      toast.success('일반 유저로 전환되었습니다!');
    }
  };

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      const { status } = await getLogout();
      if (status === 200) {
        toast.success('로그아웃 되었습니다!');
        store.setUserType(null);
      }

      store.reset();
      router.refresh();
      router.push('/');
    } catch (error) {
      toast.error('로그아웃에 실패하였습니다!');
    }
  };

  return (
    <ul className="absolute right-0 top-3 inline-flex w-[9.4375rem] select-none flex-col rounded-md bg-white shadow-vertical">
      <li className="my-4 ml-4 flex justify-between overflow-hidden whitespace-nowrap font-bold">
        <div className="flex">
          <p className="max-w-[7rem] truncate">{store.authUser?.nickname}</p>님
        </div>
      </li>
      <li className="mb-3 ml-4">
        <Link href="/my">마이 페이지</Link>
      </li>
      <li className="mb-3 ml-4">
        <Link href="/">관심 클래스</Link>
      </li>
      <li className="mb-4 ml-4">
        <Link href="/">예약 현황</Link>
      </li>

      <li className="border-t border-solid border-gray-500 text-main-color">
        <button
          onClick={handleSwitchUser}
          className="flex h-full w-full cursor-pointer gap-1 py-4 pl-4"
        >
          <TransFormSVG />
          {store.userType === 'user' ? '강사 전환' : '유저 전환'}
        </button>
      </li>

      <li className="rounded-b-md bg-gray-200 text-gray-500">
        <button
          onClick={handleLogout}
          className="h-full w-full py-2 pl-4 text-left hover:text-black"
        >
          로그아웃
        </button>
      </li>
    </ul>
  );
};

export default ProfileMenu;

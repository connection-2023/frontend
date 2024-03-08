import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TransFormSVG } from '@/icons/svg';
import {
  getSwitchUserRole,
  getLogout,
  accessTokenReissuance,
} from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { reloadToast } from '@/utils/reloadMessage';
import { userType } from '@/types/auth';

const USER_MENU = [
  <Link href="/mypage/user/myclass/apply">마이페이지</Link>,
  <Link href="/mypage/user/myclass/like">관심 클래스</Link>,
  <Link href="/mypage/user/myclass/apply">신청 현황</Link>,
];

const LECTURER_MENU = [
  <Link href="/dashboard">대시보드</Link>,
  <Link href="/mypage/instructor/manage/myclass">클래스 관리</Link>,
  <Link href="/mypage/instructor/manage/myclass">회원 관리</Link>,
];

const ProfileMenu = () => {
  const store = useUserStore();
  const router = useRouter();
  const userType = useUserStore((state) => state.userType);

  const handleSwitchUser = async () => {
    if (!userType) return;
    const toastId = toast.loading(
      userType === 'user' ? '강사로 전환 중...' : '유저로 전환 중...',
    );

    const res = await getSwitchUserRole(userType);

    if (res.status === 200) {
      await handleSuccessfulSwitch(userType);
    } else {
      await handleUnsuccessfulSwitch(res, toastId);
    }
  };

  const handleSuccessfulSwitch = async (userType: userType) => {
    window.location.reload();

    reloadToast(
      userType === 'user'
        ? '강사로 전환되었습니다!'
        : '일반 유저로 전환되었습니다!',
      'success',
    );
  };

  const handleUnsuccessfulSwitch = async (
    res: { status: number },
    toastId: number | string,
  ) => {
    if (store.userType === 'user' && res.status === 400) {
      toast.update(toastId, {
        render: (
          <p>
            강사로 등록된 회원이 아닙니다. <br />
            강사 등록 페이지로 이동합니다.
          </p>
        ),
        type: 'info',
        isLoading: false,
        autoClose: 2500,
      });

      router.push('/instructor/apply');
    } else if (res.status === 401) {
      await accessTokenReissuance();
      await handleSwitchUser();
    } else {
      toast.update(toastId, {
        render: '잘못된 요청입니다!',
        type: 'error',
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      const toastId = toast.loading('로그아웃 중...');
      const { status } = await getLogout();

      if (status === 200) {
        toast.update(toastId, {
          render: '로그아웃 되었습니다!',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });

        store.setUserType(null);
      }

      store.reset();
      router.refresh();
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

      {(userType === 'lecturer' ? LECTURER_MENU : USER_MENU).map(
        (menuList, index) => (
          <li key={index} className="mb-3 ml-4">
            {menuList}
          </li>
        ),
      )}

      <li className="border-t border-solid border-gray-500 text-main-color">
        <button
          onClick={handleSwitchUser}
          className="flex h-full w-full cursor-pointer items-center gap-1 py-4 pl-4"
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

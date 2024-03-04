'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ButtonStyles } from '@/constants/constants';
import { TransFormSVG, EditSVG } from '@/icons/svg';
import { getInstructorProfile } from '@/lib/apis/instructorApi';
import {
  getSwitchUserRole,
  getLogout,
  getMyProfile,
  accessTokenReissuance,
} from '@/lib/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { convertToProfileInfo } from '@/utils/apiDataProcessor';
import Button from '@/components/Button/Button';
import ProfileImg from '@/components/Profile/ProfileImage';
import { userType } from '@/types/auth';

const UserProfile = () => {
  const store = useUserStore();
  const router = useRouter();
  const { userType, authUser } = store;
  if (!authUser || !userType) return null;
  const { nickname, profileImage } = authUser;

  const handleSwitchUser = async () => {
    if (!userType) return;
    const toastId = toast.loading(
      userType === 'user' ? '강사로 전환 중...' : '유저로 전환 중...',
    );

    const res = await getSwitchUserRole(userType);

    if (res.status === 200) {
      await handleSuccessfulSwitch(userType, toastId);
    } else {
      await handleUnsuccessfulSwitch(res, toastId);
    }
  };

  const handleSuccessfulSwitch = async (
    userType: userType,
    toastId: number | string,
  ) => {
    const profile =
      userType === 'user' ? await getInstructorProfile() : await getMyProfile();

    if (!profile) {
      toast.update(toastId, {
        render:
          userType === 'user'
            ? '강사 프로필을 불러오는데 실패하였습니다'
            : '유저 프로필을 불러오는데 실패하였습니다',
        type: 'error',
        isLoading: false,
        autoClose: 1500,
      });
      return;
    }

    const authUser = convertToProfileInfo(profile);
    store.setAuthUser(authUser);
    store.setUserType(userType === 'user' ? 'lecturer' : 'user');
    router.push('/');
    router.refresh();

    toast.update(toastId, {
      render:
        userType === 'user'
          ? '강사로 전환되었습니다!'
          : '일반 유저로 전환되었습니다!',
      type: 'success',
      isLoading: false,
      autoClose: 1500,
    });
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
    userType && (
      <div className="bg-gray-900 px-4 py-3">
        <div className="mb-3 mt-1 flex items-center justify-between text-lg font-bold">
          <ProfileImg size="medium" src={profileImage} nickname={nickname} />

          <button
            onClick={handleLogout}
            className="rounded-md border border-solid border-gray-300 px-2.5 py-1 text-sm text-black"
          >
            로그아웃
          </button>
        </div>

        <div className="mb-3.5 flex w-full gap-x-3.5 text-lg font-semibold">
          <Button color="primary" size="large" onClick={handleSwitchUser}>
            <div className="flex items-center gap-2 text-main-color">
              <TransFormSVG />
              {store.userType === 'user' ? '강사 전환' : '유저 전환'}
            </div>
          </Button>

          {userType === 'lecturer' ? (
            <Link
              href="/class/create"
              className={ButtonStyles.secondary}
              prefetch={false}
            >
              <div className="flex items-center gap-2 text-black">
                <EditSVG width="16" height="16" className="fill-black" />
                클래스 등록
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    )
  );
};

export default UserProfile;

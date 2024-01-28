'use client';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store';
import { profileInfo, userType } from '@/types/auth';

interface UserStoreInitializerProps {
  authUser: profileInfo | null;
  userType: userType | null;
}

const UserStoreInitializer = ({
  authUser,
  userType,
}: UserStoreInitializerProps) => {
  const initialized = useRef(false);
  const { setLikeClassList, likeClassList } = useUserStore((state) => ({
    setLikeClassList: state.setLikeClassList,
    likeClassList: state.likeClassList,
  }));
  const store = useUserStore();
  const pathname = usePathname();
  const router = useRouter();
  const reload = Cookies.get('reload');

  useEffect(() => {
    if (reload === 'true') {
      Cookies.remove('reload');
      router.push(pathname);
      router.refresh();
    }
  }, [reload]);

  // useEffect(() => {
  //   store.setAuthUser(authUser);
  //   store.setUserType(userType);
  // }, [authUser, userType]); // 다음 이슈에서 수정 예정

  if (!initialized.current) {
    store.setAuthUser(authUser);
    store.setUserType(userType);
    initialized.current = true;
  }

  useEffect(() => {
    if (userType === 'user') {
      if (likeClassList.length === 0) {
        getLikesClassList().then((data) =>
          setLikeClassList(data.map(({ lectureId }) => lectureId)),
        );
      }
    } else {
      setLikeClassList([]);
    }
  }, [userType]);

  return null;
};

export default UserStoreInitializer;

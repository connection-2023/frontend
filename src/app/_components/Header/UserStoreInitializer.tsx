'use client';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store';
import { instructorProfile, userProfile, userType } from '@/types/auth';

interface UserStoreInitializerProps {
  authUser: instructorProfile | userProfile | null;
  userType: userType | null;
}

const UserStoreInitializer = ({
  authUser,
  userType,
}: UserStoreInitializerProps) => {
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

  useEffect(() => {
    store.setAuthUser(authUser);
    store.setUserType(userType);
  }, [authUser, userType]);

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

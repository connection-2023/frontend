'use client';
import { useEffect, useRef } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store';
import { instructorProfile, userProfile } from '@/types/auth';

interface UserStoreInitializerProps {
  authUser: instructorProfile | userProfile | null;
  userType: string | null;
}

const UserStoreInitializer = ({
  authUser,
  userType,
}: UserStoreInitializerProps) => {
  const { setLikeClassList, likeClassList } = useUserStore((state) => ({
    setLikeClassList: state.setLikeClassList,
    likeClassList: state.likeClassList,
  }));
  const initialized = useRef(false);
  const store = useUserStore();

  if (!initialized.current) {
    if (authUser && userType === 'user') {
      store.setAuthUser(authUser);
      store.setUserType('user');
    } else if (authUser && userType === 'lecturer') {
      store.setAuthUser(authUser);
      store.setUserType('lecturer');
    }
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

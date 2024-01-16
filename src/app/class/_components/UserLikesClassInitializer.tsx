'use client';
import { useEffect } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store/userStore';

const UserLikesClassInitializer = () => {
  const { setLikeClassList, userType } = useUserStore((state) => ({
    setLikeClassList: state.setLikeClassList,
    userType: state.userType,
  }));

  useEffect(() => {
    if (userType === 'user') {
      getLikesClassList().then((data) =>
        setLikeClassList(data.map(({ lectureId }) => lectureId)),
      );
    } else {
      setLikeClassList([]);
    }
  }, [userType]);

  return null;
};

export default UserLikesClassInitializer;

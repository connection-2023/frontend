'use client';
import { useEffect } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store/userStore';

const UserLikesClassInitializer = () => {
  const { setLikeClassList, userType, likeClassList } = useUserStore(
    (state) => ({
      setLikeClassList: state.setLikeClassList,
      userType: state.userType,
      likeClassList: state.likeClassList,
    }),
  );

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

export default UserLikesClassInitializer;

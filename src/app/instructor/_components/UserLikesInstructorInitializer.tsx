'use client';
import { useEffect } from 'react';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store/userStore';

const UserLikesInstructorInitializer = () => {
  const { setLikeInstructorList, userType, likeInstructorList } = useUserStore(
    (state) => ({
      setLikeInstructorList: state.setLikeInstructorList,
      userType: state.userType,
      likeInstructorList: state.likeInstructorList,
    }),
  );

  useEffect(() => {
    if (userType === 'user') {
      if (likeInstructorList.length === 0) {
        getLikesInstructorList().then((data) =>
          setLikeInstructorList(data.map(({ lecturerId }) => lecturerId)),
        );
      }
    } else {
      setLikeInstructorList([]);
    }
  }, [userType]);

  return null;
};

export default UserLikesInstructorInitializer;

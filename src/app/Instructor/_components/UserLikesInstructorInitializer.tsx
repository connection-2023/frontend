'use client';
import { useEffect } from 'react';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store/userStore';

const UserLikesInstructorInitializer = () => {
  const { setLikeInstructorList, userType } = useUserStore((state) => ({
    setLikeInstructorList: state.setLikeInstructorList,
    userType: state.userType,
  }));

  useEffect(() => {
    if (userType === 'user') {
      getLikesInstructorList().then((data) =>
        setLikeInstructorList(data.map(({ lecturerId }) => lecturerId)),
      );
    } else {
      setLikeInstructorList([]);
    }
  }, [userType]);

  return null;
};

export default UserLikesInstructorInitializer;

'use client';
import { useEffect } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store/userStore';

const UserLikesInitializer = () => {
  const { setLikeInstructorList, setLikeClassList, userType } = useUserStore(
    (state) => ({
      setLikeInstructorList: state.setLikeInstructorList,
      setLikeClassList: state.setLikeClassList,
      userType: state.userType,
    }),
  );

  useEffect(() => {
    if (userType === 'user') {
      getLikesInstructorList().then((data) =>
        setLikeInstructorList(data.map(({ lecturerId }) => lecturerId)),
      );

      getLikesClassList().then((data) =>
        setLikeClassList(data.map(({ lectureId }) => lectureId)),
      );
    } else {
      setLikeClassList([]);
      setLikeInstructorList([]);
    }
  }, [userType]);

  return null;
};

export default UserLikesInitializer;

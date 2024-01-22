'use client';
import { useEffect } from 'react';
import { getLikesClassList } from '@/lib/apis/classApi';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store/userStore';

const UserLikesInitializer = () => {
  const {
    setLikeInstructorList,
    setLikeClassList,
    userType,
    likeClassList,
    likeInstructorList,
  } = useUserStore((state) => ({
    setLikeInstructorList: state.setLikeInstructorList,
    setLikeClassList: state.setLikeClassList,
    userType: state.userType,
    likeClassList: state.likeClassList,
    likeInstructorList: state.likeInstructorList,
  }));

  useEffect(() => {
    if (userType === 'user') {
      if (likeInstructorList.length === 0) {
        getLikesInstructorList().then((data) =>
          setLikeInstructorList(data.map(({ lecturerId }) => lecturerId)),
        );
      }

      if (likeClassList.length === 0)
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

'use client';
import { useQueries } from '@tanstack/react-query';
import { getLikesClassList } from '@/lib/apis/classApi';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store';

const UserLikesInitializer = () => {
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));

  useQueries({
    queries: [
      {
        queryKey: ['like', 'instructor', userType],
        queryFn: async () => {
          if (userType === 'user') {
            const likesInstructorList = await getLikesInstructorList();
            return likesInstructorList.map(({ lecturerId }) => lecturerId);
          }
        },
        staleTime: Infinity,
      },
      {
        queryKey: ['like', 'class', userType],
        queryFn: async () => {
          if (userType === 'user') {
            const likesClassList = await getLikesClassList();
            return likesClassList.map(({ id }) => id);
          }
        },
        staleTime: Infinity,
      },
    ],
  });

  return null;
};

export default UserLikesInitializer;

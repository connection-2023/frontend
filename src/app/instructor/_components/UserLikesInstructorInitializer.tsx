'use client';
import { useQuery } from '@tanstack/react-query';
import { getLikesInstructorList } from '@/lib/apis/instructorLikesBlockApis';
import { useUserStore } from '@/store';

const UserLikesInstructorInitializer = () => {
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));

  useQuery({
    queryKey: ['like', 'instructor', userType],
    queryFn: async () => {
      if (userType === 'user') {
        const likesInstructorList = await getLikesInstructorList();
        return likesInstructorList.map(({ lecturerId }) => lecturerId);
      }
    },
    staleTime: Infinity,
  });

  return null;
};

export default UserLikesInstructorInitializer;

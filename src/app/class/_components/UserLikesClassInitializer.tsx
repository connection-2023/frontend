'use client';
import { useQuery } from '@tanstack/react-query';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store/userStore';

const UserLikesClassInitializer = () => {
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));

  useQuery({
    queryKey: ['like', 'instructor', userType],
    queryFn: async () => {
      if (userType === 'user') {
        const likesInstructorList = await getLikesClassList();
        return likesInstructorList.map(({ id }) => id);
      }
    },
    staleTime: Infinity,
  });

  return null;
};

export default UserLikesClassInitializer;

'use client';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';

const IdAccessChecker = ({ id }: { id: string }) => {
  const router = useRouter();
  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));

  if (Number(authUser?.id) !== Number(id)) {
    router.push('/404');
  }
  return null;
};

export default IdAccessChecker;

import { redirect } from 'next/navigation';
import { useUserStore } from '@/store';

const IdAccessChecker = ({ id }: { id: string }) => {
  const { authUser } = useUserStore.getState();

  if (Number(authUser?.id) !== Number(id)) {
    redirect('/404');
  }
  return null;
};

export default IdAccessChecker;

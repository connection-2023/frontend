import { useEffect } from 'react';
import useStore from '@/store';
import { getMyProfile } from './apis/userApi';

const useSession = () => {
  const store = useStore();

  const fetchUser = async () => {
    try {
      const { data } = await getMyProfile();
      if (data) store.setAuthUser(data.myProfile);
    } catch (error: any) {
      store.reset();
    }
  };

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
};

export default useSession;

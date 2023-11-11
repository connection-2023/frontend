import { useEffect } from 'react';
import { getInstructorProfile } from '@/lib/apis/instructorApi';
import { useUserStore } from '@/store';
import { getMyProfile } from './apis/userApi';

const useSession = () => {
  const store = useUserStore();

  const fetchUser = async () => {
    try {
      const { data } = await getMyProfile();
      if (data) {
        store.setAuthUser(data.myProfile);
        store.setUserType('user');
        return true;
      }
    } catch (error: unknown) {
      return false;
    }
  };

  const fetchInstructor = async () => {
    try {
      const data = await getInstructorProfile();
      if (data) {
        store.setAuthUser(data);
        store.setUserType('lecturer');
        return true;
      }
    } catch (error: unknown) {
      return false;
    }
  };

  useEffect(() => {
    if (!store.authUser) {
      Promise.allSettled([fetchUser(), fetchInstructor()]).then((results) => {
        if (results.every((result) => result.status === 'rejected')) {
          store.reset();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
};

export default useSession;

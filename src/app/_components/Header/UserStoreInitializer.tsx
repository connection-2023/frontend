'use client';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { RELOAD_TOAST_TIME } from '@/constants/constants';
import { getLikesClassList } from '@/lib/apis/classApi';
import { useUserStore } from '@/store';
import { profileInfo, userType } from '@/types/auth';

interface UserStoreInitializerProps {
  authUser: profileInfo | null;
  userType: userType | null;
  isMobile: boolean;
}

const UserStoreInitializer = ({
  authUser,
  userType,
  isMobile,
}: UserStoreInitializerProps) => {
  const initialized = useRef(false);
  const store = useUserStore();
  const pathname = usePathname();
  const router = useRouter();
  const reload = Cookies.get('reload');
  const toastMessage: string | undefined = Cookies.get('toast');

  Cookies.remove('toast');
  if (toastMessage) {
    const message: {
      toast?: string;
      date?: string;
      state?: 'error' | 'success';
    } = JSON.parse(toastMessage);
    const dateDifference = message.date
      ? new Date().getTime() - new Date(message.date).getTime()
      : RELOAD_TOAST_TIME + 1;

    if (dateDifference <= RELOAD_TOAST_TIME) {
      if (message.state === 'success') {
        toast.success(message.toast);
      } else {
        toast.error(message.toast);
      }
    }
  }

  if (!initialized.current) {
    store.setAuthUser(authUser);
    store.setUserType(userType);
    store.setIsMobile(isMobile);
    initialized.current = true;
  }

  useEffect(() => {
    if (reload === 'true') {
      Cookies.remove('reload');
      router.push(pathname);
      router.refresh();
    }
  }, [reload]);

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

export default UserStoreInitializer;

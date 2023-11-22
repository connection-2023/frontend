'use client';
import { useRef } from 'react';
import { useUserStore } from '@/store';
import { instructorProfile, userProfile } from '@/types/auth';

interface UserStoreInitializerProps {
  authUser: instructorProfile | userProfile | null;
  userType: string | null;
}

const UserStoreInitializer = ({
  authUser,
  userType,
}: UserStoreInitializerProps) => {
  const initialized = useRef(false);
  const store = useUserStore();

  if (!initialized.current) {
    if (authUser && userType === 'user') {
      store.setAuthUser(authUser);
      store.setUserType('user');
    } else if (authUser && userType === 'lecturer') {
      store.setAuthUser(authUser);
      store.setUserType('lecturer');
    }
    initialized.current = true;
  }

  return null;
};

export default UserStoreInitializer;

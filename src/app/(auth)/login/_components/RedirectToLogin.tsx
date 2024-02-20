'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signin', { scroll: false });
  }, []);

  return null;
};

export default RedirectToLogin;

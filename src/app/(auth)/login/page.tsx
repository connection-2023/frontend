'use client';
import { useRouter } from 'next/navigation';
import MainPage from '@/app/page';

const LoginPage = () => {
  const router = useRouter();
  router.replace('/signin');
  return <MainPage />;
};

export default LoginPage;

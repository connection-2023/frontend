import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MainPage from '@/app/page';
import RedirectToLogin from './_components/RedirectToLogin';

const LoginPage = () => {
  const cookieStore = cookies();
  const user = cookieStore.get('userAccessToken')?.value;
  const lecturer = cookieStore.get('lecturerAccessToken')?.value;

  if (user || lecturer) {
    redirect('/');
  }

  return (
    <>
      <RedirectToLogin />
      <MainPage />
    </>
  );
};

export default LoginPage;

import { ConnectionLogoSVG, AuthIconSVG } from '@/icons/svg';
import LoginButtons from './_components/LoginButtons';

const LoginPage = () => {
  return (
    <section className="mt-auto flex h-max w-full flex-col items-center">
      <AuthIconSVG className="mt-12 scale-90" />

      <h1 className="mt-1.5 text-lg font-semibold">
        즐거운 배움으로 이어주는 연결고리
      </h1>
      <ConnectionLogoSVG className="mt-4 w-80" />
      <div className="mb-18 mt-16">
        <p className="mb-5 text-lg font-normal text-gray-500">
          소셜로그인으로 간편하게 시작하기
        </p>

        <LoginButtons />
      </div>
    </section>
  );
};

export default LoginPage;

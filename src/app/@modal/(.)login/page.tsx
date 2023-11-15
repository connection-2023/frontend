import LoginButtons from '@/app/(auth)/login/_components/LoginButtons';
import { ConnectionLogoSVG, AuthIconSVG } from '@/icons/svg';
import RouterModal from '@/components/Modal/RouterModal';

const LoginModal = () => (
  <RouterModal>
    <section className="mb-20 flex w-full max-w-[25.5rem] flex-col items-center rounded-md bg-white px-10">
      <AuthIconSVG className="mt-12 scale-90" />

      <h1 className="mt-1.5 text-lg font-semibold">
        즐거운 배움으로 이어주는 연결고리
      </h1>
      <ConnectionLogoSVG className="mt-4 w-80" />
      <div className="mb-18 mt-16 md:mt-12">
        <p className="mb-5 text-lg font-normal text-gray-500">
          소셜로그인으로 간편하게 시작하기
        </p>

        <LoginButtons />
      </div>
    </section>
  </RouterModal>
);

export default LoginModal;

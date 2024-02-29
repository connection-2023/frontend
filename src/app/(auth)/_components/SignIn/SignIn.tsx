import Image from 'next/image';
import { ConnectionLogoSVG } from '@/icons/svg';
import ExploreImg from '@/images/explore.png';
import AuthButtons from './AuthButtons/AuthButtons';

const SignIn = () => {
  return (
    <section className="mx-auto flex h-full w-full max-w-[25.5rem] flex-grow flex-col items-center rounded-md bg-white px-10 shadow-float">
      <Image
        src={ExploreImg}
        alt="회원가입 이미지"
        width={184}
        height={174}
        sizes="100vw"
        className="mt-20"
      />

      <h1 className="mt-1.5 text-lg font-semibold">
        즐거운 배움으로 이어주는 연결고리
      </h1>
      <ConnectionLogoSVG className="mt-4 w-80" />
      <div className="mt-16 pb-20">
        <p className="mb-5 text-lg font-normal text-gray-500">
          소셜로그인으로 간편하게 시작하기
        </p>

        <AuthButtons />
      </div>
    </section>
  );
};

export default SignIn;

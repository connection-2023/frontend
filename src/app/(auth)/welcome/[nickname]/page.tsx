'use client';
import { useRouter } from 'next/navigation';
import { AuthWelcomeSVG, DoubleRightSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';

const Welcome = ({
  params: { nickname },
}: {
  params: { nickname: string };
}) => {
  const router = useRouter();

  const handleRouter = (path: string) => {
    router.replace(`/${path}`);
  };

  return (
    <section className="mx-auto flex h-full w-full max-w-[25.5rem] flex-col items-center justify-center rounded-md bg-white px-6 py-10 py-4 text-lg font-semibold shadow-float">
      <AuthWelcomeSVG className="mt-[4.5rem]" />

      <h2 className="mt-[2.75rem] text-[2rem] text-sub-color1 md:text-2xl">
        회원가입 완료
      </h2>
      <h3 className="mb-[6.69rem] mt-5 text-2xl md:mb-[3.75rem] md:mt-2 md:text-lg">
        {decodeURIComponent(nickname)}님, 환영합니다!
      </h3>

      <p className="mb-1.5 font-medium md:mb-2.5 md:text-sm">
        프로필 사진을 등록해보세요
      </p>

      <DoubleRightSVG className="mb-4 rotate-90 fill-sub-color1" />

      <Button
        color="default"
        size="large"
        onClick={() => {
          handleRouter('/upload-profile');
        }}
      >
        저장하기
      </Button>
      <Button
        color="secondary"
        size="large"
        onClick={() => {
          handleRouter('/');
        }}
      >
        저장하기
      </Button>
    </section>
  );
};

export default Welcome;

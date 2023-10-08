import { AuthWelcomeSVG } from '@/../public/icons/svg';
import Link from 'next/link';

interface IWelcome {
  nickname: string;
}

const Welcome = ({ nickname }: IWelcome) => {
  return (
    <section className="flex w-full flex-col items-center justify-center px-[1.31rem] py-4 font-semibold">
      <AuthWelcomeSVG className="mt-4" />

      <h2 className="mt-[0.88rem] text-2xl  text-sub-color1">회원가입 완료</h2>
      <h3 className="mt-4 text-base">{nickname}님, 환영합니다!</h3>

      <Link
        href="/class"
        className="mt-8 flex h-[2.8rem] w-full items-center justify-center rounded-[0.31rem] bg-sub-color1 text-lg text-white"
      >
        클래스 보러가기
      </Link>
    </section>
  );
};

export default Welcome;

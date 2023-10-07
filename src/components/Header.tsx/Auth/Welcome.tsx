import { AuthWelcomeSVG } from '@/../public/icons/svg';

interface IWelcome {
  nickname: string;
  onClosed: () => void;
}

const Welcome = ({ nickname, onClosed }: IWelcome) => {
  return (
    <section className="flex w-full flex-col items-center justify-center px-[1.31rem] py-4 font-semibold">
      <AuthWelcomeSVG className="mt-4" />

      <h2 className="mt-[0.88rem] text-2xl  text-sub-color1">회원가입 완료</h2>
      <h3 className="mt-4 text-base">{nickname}님, 환영합니다!</h3>

      <button
        onClick={onClosed}
        className="mt-8 h-[2.8rem] w-full rounded-[0.31rem] bg-sub-color1 text-lg text-white"
      >
        시작하기
      </button>
    </section>
  );
};

export default Welcome;

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import UserInfoSetup from './UserInfoSetup';
import ProfileSetup from './ProfileSetup';
import Welcome from './Welcome';
import { SignInResponse, ISignUp } from '@/types/auth';

interface SignUpProps {
  userInfo: SignInResponse;
  onClickPrev: () => void;
}

const SignUp = ({ userInfo, onClickPrev }: SignUpProps) => {
  const [userSignUp, setUserSignUp] = useState({
    name: '',
    nickname: '',
    email: userInfo.authEmail,
    provider: userInfo.signUpType,
    authEmail: userInfo.authEmail,
  });
  const [step, setStep] = useState(0);
  const [userNickname, setUserNickname] = useState('');

  const handleUserInput = (key: keyof ISignUp, value: string | File) => {
    // 예외 처리 필요
    setUserSignUp((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const Views = [
    <UserInfoSetup
      key="userInfo"
      userInfo={userSignUp}
      handleUserInfo={handleUserInput}
    />,
    <Welcome key="welcome" nickname={userNickname} />,
    <ProfileSetup
      key="profile"
      defaultProfile={null}
      handleUserInfo={handleUserInput}
    />,
  ];

  const handleNextStep = async () => {
    if (step === 0) {
      console.log(userSignUp);

      const res = await fetch('api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userSignUp),
      });

      const { statusCode, data } = await res.json();

      if (statusCode === 201) {
        setUserNickname(data.createUser.nickname);
        setStep((prev) => prev + 1);
        // 로그인 처리하기
      } else if (statusCode === 400) {
        toast.error('사용 중인 이메일입니다.');
      }
    } else if (step === 1) {
      // 프로필 사진 등록하기로 가기
      setStep((prev) => prev + 1);
    } else if (step === 2) {
      // 프로필 사진 전송
    }
  };

  const handlePrevStep = () => {
    if (step < 0) return;
    else if (step === 0) onClickPrev();
    else setStep((prev) => prev - 1);
  };

  return (
    <>
      {/* 해당 View 보여주기 */}
      {Views[step]}

      <div className="mb-4 flex h-8 w-full justify-between gap-4 px-[1.31rem] text-base font-semibold">
        <button
          onClick={handlePrevStep}
          className="max-w-48 h-12 w-full rounded-[0.31rem] border border-solid border-sub-color2 text-sub-color1"
        >
          {step === 0 && '이전'}
          {step === 1 && <Link href="/class">클래스 보러가기</Link>}
          {step === 2 && '건너뛰기'}
        </button>

        <button
          onClick={handleNextStep}
          className="max-w-48 h-12 w-full rounded-[0.31rem] bg-sub-color1 text-white"
        >
          {step === 0 && '가입완료'}
          {step === 1 && '프로필사진 등록'}
          {step === 2 && '저장하기'}
        </button>
      </div>
    </>
  );
};

export default SignUp;

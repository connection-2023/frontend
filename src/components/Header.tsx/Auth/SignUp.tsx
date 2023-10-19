import { useState } from 'react';
import ProfileSetup from './ProfileSetup';
import UserInfoSetup from './UserInfoSetup';
import Welcome from './Welcome';
import { SignInResponse } from '@/types/auth';

interface ISignUp {
  userInfo: SignInResponse;
  onClickPrev: () => void;
}

const SignUp = ({ userInfo, onClickPrev }: ISignUp) => {
  const [step, setStep] = useState(0);
  const Views = [
    <UserInfoSetup key="userInfo" userInfo={userInfo} />,
    <ProfileSetup key="profile" defaultProfile={null} />,
    <Welcome key="welcome" nickname="닉네임" />,
  ];

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
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

      {step < 2 && (
        <div className="mb-4 flex h-8 w-full justify-between gap-4 px-[1.31rem] text-base font-semibold">
          <button
            onClick={handlePrevStep}
            className="max-w-48 w-full rounded-[0.31rem] bg-sub-color2"
          >
            이전
          </button>
          {/* 백엔드 API 전송 */}
          <button
            onClick={handleNextStep}
            className="max-w-48 w-full rounded-[0.31rem] bg-sub-color1 text-white"
          >
            다음
          </button>
        </div>
      )}
    </>
  );
};

export default SignUp;

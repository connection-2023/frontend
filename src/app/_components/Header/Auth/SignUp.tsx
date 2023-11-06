import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getAuth, getMyProfile, postProfileImage } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import ProfileSetup from './ProfileSetup';
import UserInfoSetup from './UserInfoSetup';
import Welcome from './Welcome';
import { SignInResponse, ISignUp } from '@/types/auth';

interface SignUpProps {
  userInfo: SignInResponse;
  onClickPrev: () => void;
  isClosed: () => void;
}

const SignUp = ({ userInfo, onClickPrev, isClosed }: SignUpProps) => {
  const store = useUserStore();
  const [userSignUp, setUserSignUp] = useState({
    name: '',
    nickname: '',
    email: userInfo.authEmail,
    provider: userInfo.signUpType,
    authEmail: userInfo.authEmail,
  });
  const [step, setStep] = useState(0);
  const [userNickname, setUserNickname] = useState('');
  const [userImage, setUserImage] = useState<File | null>(null);

  const handleUserImage = (uploadImage: File) => {
    setUserImage(uploadImage);
  };

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
      handleUserImage={handleUserImage}
    />,
  ];

  const handleNextStep = async () => {
    if (step === 0) {
      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userSignUp),
      });

      const { statusCode, data } = await res.json();

      if (statusCode === 201 && userInfo.idToken) {
        setUserNickname(data.createUser.nickname);
        setStep((prev) => prev + 1);

        const response = await getAuth(
          userInfo.signUpType,
          userInfo.idToken,
        ).then((res) => getMyProfile(res.data.userAccessToken));
        // 회원가입 후 로그인 처리
        store.setAuthUser(response.data.myProfile);
      } else if (statusCode === 400) {
        toast.error('사용 중인 이메일입니다.');
      }
    } else if (step === 1) {
      // 프로필 사진 등록하러 가기
      setStep((prev) => prev + 1);
    } else if (step === 2) {
      // 프로필 사진 전송
      if (userImage) {
        const response = await postProfileImage(userImage);

        if (response.statusCode === 201) {
          // 스토어에 이미지 사진 변경 후 모달 닫기
          store.setAuthUserImage(response.data.newUserImage.imageUrl);
          toast.success('이미지 사진이 성공적으로 변경되었습니다!');
          isClosed();
        } else if (response.statusCode === 400) {
          toast.error(
            <p>
              기존에 설정된 프로필 사진이 있습니다.
              <br /> 수정할 경우 마이페이지에서 진행해주세요!
            </p>,
          );
          isClosed();
        }
      }
    } else {
      toast.error('사진을 업로드 해주세요!');
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
          className="max-w-48 h-12 w-full rounded-md border border-solid border-gray-500 text-sub-color1"
        >
          {step === 0 && '이전'}
          {step === 1 && <Link href="/class">클래스 보러가기</Link>}
          {step === 2 && '건너뛰기'}
        </button>

        <button
          onClick={handleNextStep}
          className="max-w-48 h-12 w-full rounded-md bg-sub-color1 text-white"
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

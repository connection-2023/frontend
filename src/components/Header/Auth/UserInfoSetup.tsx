import { useState } from 'react';
import { toast } from 'react-toastify';
import { KaKaoTalkSVG, NaverSVG, GoogleSVG } from '@/icons/svg';
import { checkUserNickname } from '@/lib/apis/userApi';
import { SignInResponse, ISignUp } from '@/types/auth';

const inputStyle =
  'w-36 h-8 rounded-[0.31rem] px-3 py-2 outline outline-1 outline-sub-color2';

const consentList = [
  {
    id: 'talk',
    title: '알림톡 수신 동의(선택)',
  },
  {
    id: 'email',
    title: '이메일 수신 동의(선택)',
  },
  {
    id: 'marketing',
    title: '마케팅 정보 수집 동의(선택)',
  },
];

interface Props {
  userInfo: ISignUp;
  handleUserInfo: (key: keyof ISignUp, value: string) => void;
}

const UserInfoSetup = ({ userInfo, handleUserInfo }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [validatedNickname, setValidatedNickname] = useState<string>('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = event.target.id;

    selectedOption.includes(optionId)
      ? setSelectedOption(selectedOption.filter((id) => id !== optionId))
      : setSelectedOption([...selectedOption, optionId]);
  };

  const validateNickname = async () => {
    if (!userInfo.nickname) return;
    const response = await checkUserNickname(userInfo.nickname);

    if (response.status === 200) {
      toast.success('사용 가능한 닉네임 입니다!');
      handleUserInfo('nickname', userInfo.nickname);
      setValidatedNickname(userInfo.nickname);
    } else if (response.status === 403) {
      toast.error('중복된 닉네임입니다!');
    } else {
      toast.error('잠시후 다시 시도해주세요!');
    }
  };

  const validatePhoneNumber = async () => {
    if (!userInfo.phoneNumber) return;
    // try {
    //   const res = await fetch(
    //     `api/`,
    //   );
    //   // --- 토스트 메세지로 바꿀 예정 ---
    //   if (res.status === 200) {
    //     console.log('확인된 핸드폰 번호!');
    //     handleUserInfo('phoneNumber', userInfo.phoneNumber);
    //   } else if (res.status === 403) {
    //     console.log('중복된 번호입니다!');
    //   } else {
    //     console.log('잠시후 다시 시도해주세요!');
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error('번호 인증 요청 에러: ', error.message);
    //   }
    // }
  };

  return (
    //   --- 폼 유효성 검사 API 연결할 때 추가 에정---
    <section className="flex h-full w-full flex-col justify-between">
      <div className="flex h-20 flex-col items-center justify-center gap-2 border-b border-solid border-[#D9D9D9] text-sm text-sub-color3">
        <h2>로그인 정보</h2>
        <div className="flex items-center gap-2">
          {SocialIcons(userInfo.provider)}
          {userInfo.email}
        </div>
      </div>

      <div className="mb-5 font-semibold">
        <h1 className="my-4 px-[1.31rem] text-lg">
          회원가입을 위한 정보를 입력해주세요
        </h1>
        <ul className="mb-4 flex flex-col gap-[0.62rem] border-b border-dashed border-[#D9D9D9] px-[1.31rem] pb-5 text-sm">
          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-name" className="w-12">
              이름<span className="text-sub-color1">*</span>
            </label>
            <input
              id="signup-name"
              value={userInfo.name}
              onChange={(e) => handleUserInfo('name', e.target.value)}
              className={inputStyle}
            />
          </li>

          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-nickname" className="w-12">
              닉네임<span className="text-sub-color1">*</span>
            </label>
            <input
              id="signup-nickname"
              value={userInfo.nickname}
              onChange={(e) => handleUserInfo('nickname', e.target.value)}
              className={inputStyle}
            />
            {userInfo.nickname !== validatedNickname && (
              <span
                onClick={validateNickname}
                className="cursor-pointer text-sub-color2 hover:text-black"
              >
                중복확인
              </span>
            )}
          </li>

          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-contact" className="w-12">
              연락처
            </label>
            <input
              id="signup-contact"
              type="number"
              value={userInfo.phoneNumber}
              onChange={(e) => handleUserInfo('phoneNumber', e.target.value)}
              className={inputStyle}
            />
            <span
              onClick={validatePhoneNumber}
              className="cursor-pointer text-sub-color2 hover:text-black"
            >
              인증하기
            </span>
          </li>
        </ul>

        <ul className="text-noraml flex flex-col gap-2 gap-[0.44rem] px-[1.31rem] text-sm text-sub-color3">
          {Object.values(consentList).map((option) => (
            <li key={option.id} className="flex items-center gap-[0.37rem]">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedOption.includes(option.id)}
                onChange={handleCheckboxChange}
                className="h-[18px] w-[18px] accent-sub-color1"
              />
              <label htmlFor={option.id}> {option.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserInfoSetup;

const SocialIcons = (socialType: SignInResponse['signUpType']) => {
  if (socialType === 'NAVER') {
    return (
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#03C75A]">
        <NaverSVG width="9" height="9" />
      </button>
    );
  } else if (socialType === 'KAKAO') {
    return (
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#FEE500]">
        <KaKaoTalkSVG width="11.28" height="10.56" />
      </button>
    );
  } else if (socialType === 'GOOGLE') {
    return (
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full">
        <GoogleSVG width="58" height="57" />
      </button>
    );
  } else return null;
};

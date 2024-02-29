import { useState, useEffect } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { KaKaoTalkSVG, NaverSVG, GoogleSVG, CheckMarkSVG } from '@/icons/svg';
import { checkUserNickname } from '@/lib/apis/userApi';
import StatusButton from '@/components/Button/StatusButton';
import { SignInResponse } from '@/types/auth';
import { IRegisterForm } from '@/types/form';
import { FetchError } from '@/types/types';

const inputStyle =
  'w-full max-w-[15.4rem] h-8 rounded-md px-3 py-2 outline outline-1 outline-gray-700 focus:outline-sub-color1';

interface UserSetupProps {
  userEmail: string;
  signUpType: SignInResponse['signUpType'];
  userRegistrationForm: IRegisterForm | undefined;
  // eslint-disable-next-line no-unused-vars
  updateUserRegistrationData: (data: IRegisterForm) => void;
}

const UserSetup = ({
  userEmail,
  signUpType,
  userRegistrationForm,
  updateUserRegistrationData,
}: UserSetupProps) => {
  const [validatedNickname, setValidatedNickname] = useState<
    string | undefined
  >(userRegistrationForm?.nickname);
  const [validatedPhoneNumber, setValidatedPhoneNumber] = useState<
    string | undefined
  >(userRegistrationForm?.phoneNumber);
  const [numberValidation, setNumberValidation] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : null));
      }, 1000);

      if (timer === 0) {
        setTimer(null);
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer]);

  const { register, handleSubmit, watch } = useForm<IRegisterForm>({
    defaultValues: userRegistrationForm,
  });
  const [name, nickname] = watch(['name', 'nickname']);
  const phoneNumber = watch('phoneNumber');

  const validateNickname = async () => {
    if (nickname.length > 11) {
      return toast.error('닉네임은 최대 11글자까지 가능합니다!');
    }

    if (nickname.length < 2 || nickname.length > 12) {
      return toast.error('닉네임은 2자 이상, 12자 이하로 작성 해주세요.');
    }

    const pattern = /^[가-힣a-zA-Z0-9]+$/;
    if (!pattern.test(nickname)) {
      return toast.error('올바른 닉네임을 작성 해주세요.');
    }

    try {
      await checkUserNickname(nickname);
      toast.success('사용 가능한 닉네임 입니다!');
      setValidatedNickname(nickname);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 403) {
          toast.error('중복된 닉네임입니다!');
        } else {
          toast.error('잠시후 다시 시도해주세요!');
        }
      }
    }
  };

  const validatePhoneNumber = async () => {
    if (!phoneNumber) {
      toast.error('연락처를 먼저 입력해주세요!');
      return;
    }

    if (!phoneNumber.startsWith('010')) {
      toast.error('번호는 010으로 시작해야합니다!');
      return;
    }
    toast.info('인증번호가 전송되었습니다!');
    setNumberValidation(null);
    setTimer(180);

    // try {
    //   const res = await fetch(
    //     `api/`,
    //   );
    //   // --- 토스트 메세지로 바꿀 예정 ---
    //   if (res.status === 200) {
    //     console.log('번호 인증이 완료되었습니다!');
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

  const handleNumberValidation = () => {
    if (phoneNumber && numberValidation === 1234) {
      setValidatedPhoneNumber(phoneNumber);
      setTimer(null);
    }
  };

  const onSubmit = (data: IRegisterForm) => {
    if (data.phoneNumber && !validatedPhoneNumber) {
      toast.error('연락처 인증을 완료해주세요!');
      return;
    }
    updateUserRegistrationData(data);
  };

  const onError = (errors: FieldErrors<IRegisterForm>) => {
    toast.error(errors.phoneNumber?.message);
  };

  return (
    <section className="mx-auto flex h-full w-full max-w-[25.5rem] flex-col">
      <h1 className="mb-2.5 text-lg font-semibold">
        회원가입을 위한 정보를 입력해주세요
      </h1>

      <div className="mb-8 flex items-center gap-2 text-sm text-gray-100">
        <h2 className="font-semibold">연동계정</h2>
        {SocialIcons(signUpType)}
        {userEmail}
      </div>

      <form
        className="mb-5 flex w-full flex-grow flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <ul className="mb-4 flex flex-col gap-[0.62rem] pb-5 text-sm">
          <li className="flex flex-col gap-1.5">
            <label htmlFor="signup-name" className="w-12">
              이름<span className="text-sub-color1">*</span>
            </label>
            <input
              id="signup-name"
              className={inputStyle}
              {...register('name', {
                required: '이름은 필수 입력 사항입니다!',
              })}
            />
          </li>

          <li className="flex flex-col gap-1.5">
            <label htmlFor="signup-nickname" className="w-12">
              닉네임<span className="text-sub-color1">*</span>
            </label>
            <div className="flex w-full gap-3">
              <div className="relative w-full max-w-[15.4rem]">
                <input
                  id="signup-nickname"
                  {...register('nickname', {
                    required: '닉네임은 필수 입력 사항입니다!',
                    validate: (value) =>
                      value === validatedNickname ||
                      '닉네임 중복을 확인해주세요.',
                  })}
                  className={`peer ${inputStyle}`}
                />
                {validatedNickname !== undefined &&
                  nickname === validatedNickname && (
                    <CheckMarkSVG
                      width="20"
                      className="absolute right-2 top-1 fill-[#03C75A]"
                    />
                  )}
              </div>

              <div className="w-full max-w-[6rem]">
                <StatusButton
                  disabled={!nickname || nickname === validatedNickname}
                  onClick={validateNickname}
                >
                  중복확인
                </StatusButton>
              </div>
            </div>
          </li>

          <li className="flex flex-col gap-1.5">
            <label htmlFor="signup-contact" className="w-12">
              연락처
            </label>
            <div className="w-full">
              <div className="flex w-full gap-3">
                <div className="relative w-full max-w-[15.4rem]">
                  <input
                    id="signup-contact"
                    type="number"
                    {...register('phoneNumber', {
                      validate: (value) =>
                        !value ||
                        value === validatedPhoneNumber ||
                        '연락처를 인증을 해주세요!',
                    })}
                    className={inputStyle}
                  />
                  {validatedPhoneNumber && (
                    <CheckMarkSVG
                      width="20"
                      className="absolute right-2 top-1 fill-[#03C75A]"
                    />
                  )}
                  {timer !== 0 && timer && (
                    <span className="absolute right-2 top-0 flex h-8 items-center text-gray-500 ">
                      {formatTime(timer)}
                    </span>
                  )}
                </div>

                <div className="w-full max-w-[6rem]">
                  <StatusButton
                    disabled={
                      !phoneNumber ||
                      phoneNumber === validatedPhoneNumber ||
                      timer !== null
                    }
                    onClick={validatePhoneNumber}
                  >
                    번호인증
                  </StatusButton>
                </div>
              </div>
            </div>

            {phoneNumber && (
              <div className="flex gap-3">
                <input
                  id="signup-phone-validation"
                  type="number"
                  onChange={(e) => setNumberValidation(Number(e.target.value))}
                  className={inputStyle}
                />

                <div className="w-full max-w-[6rem]">
                  <StatusButton
                    disabled={
                      !numberValidation || validatedPhoneNumber === phoneNumber
                    }
                    onClick={handleNumberValidation}
                  >
                    인증하기
                  </StatusButton>
                </div>
              </div>
            )}
          </li>
        </ul>
        <div className="mt-auto flex justify-end">
          <StatusButton disabled={!(name && validatedNickname)} type="submit">
            다음
          </StatusButton>
        </div>
      </form>
    </section>
  );
};

export default UserSetup;

const SocialIcons = (socialType: SignInResponse['signUpType']) => {
  if (socialType === 'NAVER') {
    return (
      <button
        aria-label="Naver 로그인"
        className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-naver"
      >
        <NaverSVG width="9" height="9" />
      </button>
    );
  } else if (socialType === 'KAKAO') {
    return (
      <button
        aria-label="Kakao 로그인"
        className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-kakao"
      >
        <KaKaoTalkSVG width="11.28" height="10.56" />
      </button>
    );
  } else if (socialType === 'GOOGLE') {
    return (
      <button
        aria-label="Google 로그인"
        className="flex h-[21px] w-[21px] items-center justify-center rounded-full"
      >
        <GoogleSVG width="58" height="57" />
      </button>
    );
  } else return null;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

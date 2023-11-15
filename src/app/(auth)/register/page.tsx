'use client';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getAuth, postUserRegister, getMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { IRegisterConsents, SignInResponse } from '@/types/auth';
import { IRegisterForm } from '@/types/form';

const UserConsentForm = dynamic(() => import('./_components/UserConsentForm'));
const UserSetup = dynamic(() => import('./_components/UserSetup'));

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userEmail = searchParams.get('userEmail');
  const signUpType = searchParams.get('type');
  const store = useUserStore();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [userRegistrationForm, setUserRegistrationForm] =
    useState<IRegisterForm>();
  const [userConsents, setUserConsents] = useState<IRegisterConsents>();

  if (!token || !userEmail || !signUpType) return;

  const isValidSignUpType = (
    value: string,
  ): value is SignInResponse['signUpType'] => {
    return value === 'NAVER' || value === 'KAKAO' || value === 'GOOGLE';
  };

  if (!isValidSignUpType(signUpType)) {
    return;
  }

  const handleNextStep = () => {
    if (activeStep < 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleUserInfo = (data: IRegisterForm) => {
    setUserRegistrationForm(data);
    handleNextStep();
  };

  const handleUserAgree = (data: IRegisterConsents) => {
    setUserConsents(data);
    handleNextStep();
  };

  const handleUserRegister = async () => {
    if (!userRegistrationForm) return;

    const { name, nickname, phoneNumber } = userRegistrationForm;

    const userInfo = {
      provider: signUpType,
      email: userEmail,
      authEmail: userEmail,
      name,
      nickname,
      ...(phoneNumber ? { phoneNumber } : {}),
    };

    const response = await postUserRegister(userInfo);
    const { statusCode, data, message } = response;

    if (statusCode === 201) {
      const response = await getAuth(signUpType, token).then((res) =>
        getMyProfile(res.data.userAccessToken),
      );

      store.setAuthUser(response.data.myProfile);
      router.replace(`/welcome/${data.createUser.nickname}`);
    } else if (statusCode === 400) {
      toast.error(message[0]);
      router.replace('/');
    }
  };

  const updateUserRegistrationData = (
    data?: IRegisterForm | IRegisterConsents,
  ) => {
    if (data) {
      switch (activeStep) {
        case 0:
          handleUserInfo(data as IRegisterForm);
          break;
        case 1:
          handleUserAgree(data as IRegisterConsents);
          handleUserRegister();
          break;
        default:
          console.error('Invalid step');
      }
    }
  };

  const handlePrev = () => {
    if (activeStep === 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const steps = [
    {
      title: '회원정보 입력',
      component: (
        <UserSetup
          userEmail={userEmail}
          signUpType={signUpType}
          userRegistrationForm={userRegistrationForm}
          updateUserRegistrationData={updateUserRegistrationData}
        />
      ),
    },
    {
      title: '약관동의',
      component: (
        <UserConsentForm
          handlePrev={handlePrev}
          updateUserRegistrationData={updateUserRegistrationData}
        />
      ),
    },
  ];

  return (
    <section className="mx-auto flex h-max w-full max-w-[25.5rem] flex-grow flex-col rounded-md bg-white px-6 pb-6 shadow-float">
      <ul className="mb-6 mt-[4.5rem] flex h-[2.2rem] w-full items-center justify-between whitespace-nowrap rounded-[3.13rem] text-base font-semibold shadow-float">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex h-full flex-grow items-center justify-center gap-2 rounded-[3.13rem] px-1 ${
              activeStep === index
                ? 'bg-sub-color1 text-white'
                : 'text-gray-500'
            }`}
          >
            <span
              className={`flex h-[19px] w-[19px] items-center justify-center rounded-full text-base ${
                activeStep === index
                  ? 'bg-white text-sub-color1'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {index + 1}
            </span>
            {step.title}
          </li>
        ))}
      </ul>

      {steps[activeStep].component}
    </section>
  );
};

export default RegisterPage;

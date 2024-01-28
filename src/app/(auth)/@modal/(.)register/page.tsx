'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UserSetup from '@/app/(auth)/register/_components//UserSetup';
import UserConsentForm from '@/app/(auth)/register/_components/UserConsentForm';
import { getAuth, postUserRegister, getMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import RouterModal from '@/components/Modal/RouterModal';
import { IRegisterConsents, SignInResponse } from '@/types/auth';
import { IRegisterForm } from '@/types/form';
import { convertToProfileInfo } from '@/utils/apiDataProcessor';

const RegisterModal = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userEmail = searchParams.get('userEmail');
  const signUpType = searchParams.get('type');
  const store = useUserStore();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [userRegistrationForm, setUserRegistrationForm] =
    useState<IRegisterForm>();

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

  const handleUserRegister = async (registerConsents: IRegisterConsents) => {
    if (!userRegistrationForm || !registerConsents) return;

    const { name, nickname, phoneNumber } = userRegistrationForm;

    const userInfo = {
      provider: signUpType,
      email: userEmail,
      authEmail: userEmail,
      name,
      nickname,
      ...(phoneNumber ? { phoneNumber } : {}),
      registerConsents,
    };

    const response = await postUserRegister(userInfo);
    const { statusCode, data } = response;

    if (statusCode === 201) {
      const response = await getAuth(signUpType, token).then((res) =>
        getMyProfile(res.data.userAccessToken),
      );
      const authUser = convertToProfileInfo(response);

      store.setUserType('user');
      store.setAuthUser(authUser);
      router.replace(`/welcome/${data.createUser.nickname}`);
    } else if (statusCode === 400) {
      toast.error('사용 중인 이메일입니다.');
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
          handleUserRegister(data as IRegisterConsents);
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
    <RouterModal>
      <section className="mb-2 flex h-[37.5rem] w-full min-w-[25rem] flex-col rounded-md bg-white px-6">
        <ul className="mb-6 mt-[3.5rem] flex h-[35px] shrink-0 items-center justify-between whitespace-nowrap rounded-[3.13rem] text-base font-semibold shadow-float">
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
    </RouterModal>
  );
};

export default RegisterModal;

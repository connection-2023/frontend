'use client';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InstructorAuth from './_components/InstructorAuth';
import InstructorIntroduction from './_components/InstructorIntroduction';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { ErrorMessage, InstructorRegister } from '@/types/types';

const steps = [
  { title: '강사 인증', component: <InstructorAuth /> },
  { title: '강사 소개', component: <InstructorIntroduction /> },
];

const ApplyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const instructorRegisterState = useRef<InstructorRegister>({});
  const formMethods = useForm({ shouldFocusError: false });

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); //새로고침 저장 안됨 안내 메시지

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const onValid = (data: any) => {
    instructorRegisterState.current = {
      ...instructorRegisterState.current,
      ...data,
    };

    activeStep === 1 ? console.log('마지막') : nextStep();
  };

  const invalid = (data: Record<string, any>) => {
    const invalidList = Object.entries(data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setInvalidData(invalidList);
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  return (
    <main className="mx-auto mb-28 flex w-full max-w-[40rem] flex-col items-center">
      <h1 className="my-3 text-2xl font-bold">강사등록</h1>
      {/* 상태 바 */}
      <ul className="flex h-[45px] w-full items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex h-full flex-grow items-center justify-center gap-2 rounded-[3.13rem] px-1 ${
              activeStep === index
                ? 'bg-sub-color1 text-white'
                : 'text-sub-color2'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                activeStep === index
                  ? 'bg-white text-sub-color1'
                  : 'bg-sub-color2 text-white'
              }`}
            >
              {index + 1}
            </span>
            {step.title}
          </li>
        ))}
      </ul>

      <FormProvider {...formMethods}>
        {steps[activeStep].component}
      </FormProvider>

      <form onSubmit={handleSubmit(onValid, invalid)} className="w-full">
        <button
          className={`h-9 w-full rounded-[0.31rem] text-white ${
            isValid ? 'bg-sub-color1' : 'bg-sub-color2'
          }`}
          disabled={!isValid}
        >
          다음
        </button>
      </form>

      <ValidationMessage
        closeModal={closeValidationMessage}
        invalidData={invalidData}
      />
    </main>
  );
};

export default ApplyPage;

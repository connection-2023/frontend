'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InstructorAuth from './_components/InstructorAuth';
import InstructorIntroduction from './_components/InstructorIntroduction';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { ErrorMessage } from '@/types/types';

const steps = [
  { title: '강사 인증', component: <InstructorAuth /> },
  { title: '강사 소개', component: <InstructorIntroduction /> },
];

const ApplyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const formMethods = useForm({ shouldFocusError: false });

  const { handleSubmit } = formMethods;

  const onValid = (data: any) => {
    //Validation 작성 하면서 data 타입 변경 요망

    console.log(data);
    nextStep();
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
        <button className="h-9 w-full cursor-pointer rounded-[0.31rem] bg-sub-color2 text-white">
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

'use client';
import { useState } from 'react';
import InstructorAuth from './_components/InstructorAuth';

const steps = [
  { title: '강사 인증', component: <InstructorAuth /> },
  { title: '강사 소개', component: null },
];

const ApplyPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
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
      {steps[activeStep].component}

      <button
        onClick={nextStep}
        className="h-9 w-full cursor-pointer rounded-[0.31rem] bg-sub-color2 text-white"
      >
        다음
      </button>
    </main>
  );
};

export default ApplyPage;

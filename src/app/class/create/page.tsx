'use client';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { hookForm } from './_recoil/hookForm/atom';
import { Button } from '@/components/Button/Button';
import { ArrowRightSVG } from '../../../../public/icons/svg';
import { useForm } from 'react-hook-form';

const steps = [
  { title: '사진, 카테고리, 가격 설정', component: null },
  { title: '클래스 상세 설명', component: null },
  { title: '일정 및 공지사항', component: null },
  { title: '클래스 장소', component: null },
];

export default function ClassCreate() {
  const [activeStep, setActiveStep] = useState(0);
  const formMethods = useRecoilValue(hookForm);

  if (!formMethods) {
    //ts 에러 명시적 해결
    return;
  }

  const { handleSubmit } = formMethods;

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const onValid = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <main className="px-[2.38rem]">
      <h1 className="my-4 flex w-full justify-center text-2xl font-bold">
        클래스 작성
      </h1>
      {/* 상태 바  */}
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

      <h2 className="mb-9 mt-8 flex items-center text-2xl font-bold text-sub-color1">
        <span
          className="mr-2 flex h-7 w-7
items-center justify-center rounded-full border border-solid border-sub-color1 text-lg"
        >
          {activeStep + 1}
        </span>
        {steps[activeStep].title}
      </h2>

      {/* 해당 컴포넌트*/}
      <div className="">{steps[activeStep].component}</div>

      {/* 하단 버튼 */}
      <nav className="my-10 flex w-full justify-between text-lg font-bold">
        <button className="flex items-center">
          <ArrowRightSVG className="mr-2 origin-center rotate-180" />
          이전
        </button>
        <div className="flex">
          <Button>임시저장</Button>
          <form onSubmit={handleSubmit(onValid)}>
            <button className="ml-4 flex items-center">
              다음
              <ArrowRightSVG className="ml-3" />
            </button>
          </form>
        </div>
      </nav>
    </main>
  );
}

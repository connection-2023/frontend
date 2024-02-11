import { BaseSyntheticEvent } from 'react';
import { ArrowRightSVG } from '@/icons/svg';

interface ClassCreateProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  nextHandleSubmit: (
    targetStep: number,
  ) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  prevHandleSubmit: (
    targetStep: number,
  ) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  updateDraftsHandleSubmit: () => void;
}

const ClassCreate = ({
  title,
  children,
  currentStep,
  nextHandleSubmit,
  prevHandleSubmit,
  updateDraftsHandleSubmit,
}: ClassCreateProps) => {
  return (
    <section className="mx-auto flex max-w-[675px] flex-col">
      <h2 className="mt-8 flex items-center text-2xl font-bold text-sub-color1">
        <span
          className="mr-2 flex h-7 w-7
items-center justify-center rounded-full border border-solid border-sub-color1 text-lg"
        >
          {currentStep + 1}
        </span>
        {title}
      </h2>

      {children}

      {/* 하단 버튼 */}
      <nav className="my-10 flex w-full justify-between text-lg font-bold">
        <form onSubmit={prevHandleSubmit(currentStep - 1)}>
          <button className="flex items-center">
            <ArrowRightSVG className="mr-2 h-[15px] w-[9px] origin-center rotate-180 stroke-black" />
            이전
          </button>
        </form>
        <div className="flex">
          <form onSubmit={updateDraftsHandleSubmit}>
            <button className="flex items-center whitespace-nowrap rounded-md bg-black px-[0.87rem] py-[0.31rem] text-sm font-bold text-white">
              임시저장
            </button>
          </form>
          {currentStep !== 4 ? (
            <form onSubmit={nextHandleSubmit(currentStep + 1)}>
              <button className="ml-4 flex items-center">
                다음
                <ArrowRightSVG className="ml-3 h-[15px] w-[9px] stroke-black" />
              </button>
            </form>
          ) : (
            <form>
              <button className="ml-4 flex items-center">등록하기</button>
            </form>
          )}
        </div>
      </nav>
    </section>
  );
};

export default ClassCreate;

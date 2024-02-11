import { BaseSyntheticEvent, useEffect } from 'react';

interface ClassCreateNavProps {
  currentStep: number;
  activeStep: number;
  navSteps: {
    title: string;
    svg: JSX.Element;
  }[];
  nextHandleSubmit: (
    targetStep: number,
  ) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  prevHandleSubmit: (
    targetStep: number,
  ) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

const ClassCreateNav = ({
  navSteps,
  currentStep,
  activeStep,
  nextHandleSubmit,
  prevHandleSubmit,
}: ClassCreateNavProps) => {
  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <nav className="flex h-[45px] w-full min-w-[675px] items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-float">
      {navSteps.map(({ title, svg }, targetStep) => {
        const activeNavButton =
          targetStep <= activeStep + (currentStep === activeStep ? 1 : 0) &&
          currentStep !== targetStep;

        const handleSubmit =
          currentStep < targetStep
            ? nextHandleSubmit(targetStep)
            : prevHandleSubmit(targetStep);

        return (
          <form
            className={`group flex h-full flex-grow items-center justify-center rounded-[3.13rem] px-1 ${
              currentStep === targetStep
                ? 'bg-sub-color1 text-white'
                : 'text-gray-500'
            } ${
              activeNavButton
                ? 'hover:bg-[#8338ec] hover:bg-opacity-50 hover:text-white'
                : 'pointer-events-none'
            } `}
            key={title}
            onSubmit={handleSubmit}
          >
            <button className="flex flex-grow items-center justify-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  currentStep === targetStep
                    ? 'bg-white text-sub-color1'
                    : 'bg-gray-500 text-white'
                }
              ${
                activeNavButton &&
                'group-hover:bg-white group-hover:text-sub-color1'
              }`}
              >
                {targetStep + 1}
              </span>
              {title}
            </button>
          </form>
        );
      })}
    </nav>
  );
};

export default ClassCreateNav;

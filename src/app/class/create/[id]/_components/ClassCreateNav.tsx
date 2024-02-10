interface ClassCreateNavProps {
  currentStep: number;
  activeStep: number;
  navSteps: {
    title: string;
    svg: JSX.Element;
  }[];
}

const ClassCreateNav = ({
  navSteps,
  currentStep,
  activeStep,
}: ClassCreateNavProps) => {
  return (
    <nav className="flex h-[45px] w-full min-w-[675px] items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-float">
      {navSteps.map(({ title, svg }, index) => {
        const activeNavButton =
          index <= activeStep + 1 && currentStep !== index;

        return (
          <form
            className={`group flex h-full flex-grow items-center justify-center rounded-[3.13rem] px-1 ${
              currentStep === index
                ? 'bg-sub-color1 text-white'
                : 'text-gray-500'
            } ${
              activeNavButton
                ? 'hover:bg-[#8338ec] hover:bg-opacity-50 hover:text-white'
                : 'pointer-events-none'
            } `}
            key={title}
          >
            <button className="flex flex-grow items-center justify-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  currentStep === index
                    ? 'bg-white text-sub-color1'
                    : 'bg-gray-500 text-white'
                }
              ${
                activeNavButton &&
                'group-hover:bg-white group-hover:text-sub-color1'
              }`}
              >
                {index + 1}
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

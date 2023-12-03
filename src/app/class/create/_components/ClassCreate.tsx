'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ArrowRightSVG } from '@/icons/svg';
import { updateClassDraft } from '@/lib/apis/classApi';
import { useClassCreateStore } from '@/store/classCreate';
import { classCreate, classOutputDataProcess } from '@/utils/apiDataProcessor';
import ClassCategory from './ClassCategory';
import ClassExplanation from './ClassExplanation';
import ClassLocation from './ClassLocation';
import ClassPrice from './ClassPrice';
import ClassSchedule from './ClassSchedule';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { IprocessedDraft, classCreateData } from '@/types/class';
import { ErrorMessage } from '@/types/types';

const steps = [
  { title: '사진, 카테고리 설정', component: <ClassCategory /> },
  { title: '클래스 상세 설명', component: <ClassExplanation /> },
  { title: '일정 및 공지사항', component: <ClassSchedule /> },
  { title: '클래스 장소', component: <ClassLocation /> },
  { title: '가격 설정', component: <ClassPrice /> },
];

export default function ClassCreate({ step }: { step: string | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { classData, setClassData, setProcessedClassData } =
    useClassCreateStore();

  const [activeStep, setActiveStep] = useState(step ? Number(step) : 0);
  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const formMethods = useForm<classCreateData>({ shouldFocusError: false });
  const { handleSubmit } = formMethods;

  const id = searchParams.get('id');

  useEffect(() => {
    if (id === null && classData) {
      setClassData(null);
    }
    if (id && !classData) {
      location.reload();
    }
  }, [id]); //추후 리펙토링...

  useEffect(() => {
    if (classData) {
      const step = Number(searchParams.get('step'));
      const isValidStep = !isNaN(step) && step - 1 <= (classData?.step || 0);

      if (isValidStep) {
        setActiveStep(step);
      } else {
        router.back();
      }
    }
  }, [searchParams]);

  const setProcessedClassDataHandler = (data: IprocessedDraft) => {
    setProcessedClassData({ ...classData, ...data });
  };

  const moveStep = (step: number | string) => {
    if (classData) {
      router.push(`${pathname}?step=${step}&id=${classData.id}`);
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1 && classData) {
      setActiveStep(activeStep + 1);
      moveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0 && classData) {
      setActiveStep(activeStep - 1);
      moveStep(activeStep - 1);
    }
  };

  const onValid = async (data: classCreateData) => {
    await updateDraft(data);
    nextStep();
  };

  const invalid = (data: Record<string, any>) => {
    const invalidList = Object.entries(data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setInvalidData(invalidList);
  };

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const updateDraft = async (
    data: classCreateData,
    shouldShowToast?: boolean,
  ) => {
    shouldShowToast = shouldShowToast === undefined ? true : shouldShowToast;

    if (classData && classData.id) {
      try {
        if (classData.step === null || classData.step! < activeStep) {
          setProcessedClassData({ ...classData, step: activeStep });
        }

        const processData = await classOutputDataProcess(
          data,
          activeStep,
          setProcessedClassDataHandler,
        );

        await updateClassDraft({
          lectureId: classData.id,
          step:
            classData.step === null || classData.step! < activeStep
              ? activeStep
              : classData.step,
          ...processData,
        });
        if (shouldShowToast) {
          toast.success('임시저장 완료');
        }
      } catch (error) {
        console.error(error);
        toast.error('임시저장 실패');
      }
    }
  };

  const navOnValidHandler = async (data: classCreateData, index: number) => {
    if (activeStep < index) {
      await updateDraft(data);
    }
    moveStep(index);
  };

  const navinvalidHandler = async (
    data: Record<string, any>,
    index: number,
  ) => {
    activeStep > index ? moveStep(index) : invalid(data);
  };

  const createClass = async (data: classCreateData) => {
    try {
      if (classData && classData.id) {
        await updateDraft(data, false);
        const lecturerId = await classCreate(classData.id);
        toast.success('클래스 등록 완료');
        router.push(`/class/${lecturerId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('클래스 등록 실패');
    }
  };

  return (
    <main className="mx-auto max-w-[1440px] px-[2.38rem]">
      <h1 className="my-4 flex w-full justify-center text-2xl font-bold">
        클래스 작성
      </h1>

      {/* 상태 바  */}
      <nav className="flex h-[45px] w-full min-w-[675px] items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-float">
        {steps.map((step, index) => (
          <form
            className={`group flex h-full flex-grow items-center justify-center rounded-[3.13rem] px-1 ${
              activeStep === index
                ? 'bg-sub-color1 text-white'
                : 'text-gray-500'
            } ${
              classData &&
              classData.step &&
              classData.step + 1 >= index &&
              activeStep !== index
                ? 'hover:bg-[#8338ec] hover:bg-opacity-50 hover:text-white' // 추후 컬러 글로버 설정 된걸로 변경 ex)opactity sub 1
                : 'pointer-events-none'
            } `}
            key={step.title}
            onSubmit={handleSubmit(
              (data) => navOnValidHandler(data, index),
              (data) => navinvalidHandler(data, index),
            )}
          >
            <button className="flex flex-grow items-center justify-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  activeStep === index
                    ? 'bg-white text-sub-color1'
                    : 'bg-gray-500 text-white'
                } 
              ${
                classData &&
                classData.step &&
                classData.step + 1 >= index &&
                activeStep !== index &&
                'group-hover:bg-white group-hover:text-sub-color1'
              }`}
              >
                {index + 1}
              </span>
              {step.title}
            </button>
          </form>
        ))}
      </nav>
      <section className="mx-auto flex max-w-[675px] flex-col">
        <h2 className="mt-8 flex items-center text-2xl font-bold text-sub-color1">
          <span
            className="mr-2 flex h-7 w-7
items-center justify-center rounded-full border border-solid border-sub-color1 text-lg"
          >
            {activeStep + 1}
          </span>
          {steps[activeStep].title}
        </h2>

        {/* 해당 컴포넌트*/}
        <FormProvider {...formMethods}>
          {steps[activeStep].component}
        </FormProvider>

        {/* 하단 버튼 */}
        <nav className="my-10 flex w-full justify-between text-lg font-bold">
          <button onClick={prevStep} className="flex items-center">
            <ArrowRightSVG className="mr-2 h-[15px] w-[9px] origin-center rotate-180 stroke-black" />
            이전
          </button>
          <div className="flex">
            <form onSubmit={handleSubmit((data) => updateDraft(data), invalid)}>
              <button className="flex items-center whitespace-nowrap rounded-md bg-black px-[0.87rem] py-[0.31rem] text-sm font-bold text-white">
                임시저장
              </button>
            </form>
            {activeStep !== 4 ? (
              <form onSubmit={handleSubmit(onValid, invalid)}>
                <button className="ml-4 flex items-center">
                  다음
                  <ArrowRightSVG className="ml-3 h-[15px] w-[9px] stroke-black" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(createClass, invalid)}>
                <button className="ml-4 flex items-center">등록하기</button>
              </form>
            )}
          </div>
        </nav>
      </section>

      {/* 유효성 토스트 메세지 */}
      <ValidationMessage
        closeModal={closeValidationMessage}
        invalidData={invalidData}
      />
    </main>
  );
}

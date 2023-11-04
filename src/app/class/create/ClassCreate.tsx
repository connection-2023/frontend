'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowRightSVG } from '@/icons/svg';
import { updateClassDraft } from '@/lib/apis/classApi';
import { useClassCreateStore } from '@/store/classCreate';
import { classOutputDataProcess } from '@/utils/apiDataProcessor';
import ClassCategory from './_components/ClassCategory';
import ClassExplanation from './_components/ClassExplanation';
import ClassLocation from './_components/ClassLocation';
import ClassPrice from './_components/ClassPrice';
import ClassSchedule from './_components/ClassSchedule';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { IGetClassDraft, classCreateData } from '@/types/class';
import { ErrorMessage } from '@/types/types';

const steps = [
  { title: '사진, 카테고리 설정', component: <ClassCategory /> },
  { title: '클래스 상세 설명', component: <ClassExplanation /> },
  { title: '일정 및 공지사항', component: <ClassSchedule /> },
  { title: '클래스 장소', component: <ClassLocation /> },
  { title: '가격 설정', component: <ClassPrice /> },
];

export default function ClassCreate() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setClassData } = useClassCreateStore();
  const classData = useClassCreateStore((state) => state.classData);

  const [activeStep, setActiveStep] = useState(classData?.step ?? 0);
  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const formMethods = useForm<classCreateData>({ shouldFocusError: false });
  const { handleSubmit } = formMethods;

  const nextStep = () => {
    if (activeStep < steps.length - 1 && classData) {
      setActiveStep(activeStep + 1);
      router.push(`/class/create?step=${activeStep + 1}&id=${classData.id}`);
    }
  };

  const prevStep = () => {
    if (activeStep > 0 && classData) {
      setActiveStep(activeStep - 1);
      router.push(`/class/create?step=${activeStep - 1}&id=${classData.id}`);
    }
  };

  const onValid = (data: any) => {
    // setLectureData((prevState) => ({
    //   ...prevState,
    //   ...data,
    // }));

    // const uploadImgList = await handleImageUpload(profileImageUrls);

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

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const updateDraft = async (data: classCreateData) => {
    if (classData) {
      const processData = await classOutputDataProcess(data, activeStep);

      await updateClassDraft({
        lectureId: classData.id,
        step: activeStep,
        ...processData,
      });
    }
  };

  const inputDataProcess = (data: IGetClassDraft) => {
    const genres = data.temporaryLectureToDanceGenre.map(
      (item) => item.danceCategory.genre,
    );

    const difficultyLevel =
      data.difficultyLevel === '상'
        ? '상급'
        : data.difficultyLevel === '중'
        ? '중급'
        : data.difficultyLevel === '하'
        ? '초급(입문)'
        : null;

    return { ...data, temporaryLectureToDanceGenre: genres, difficultyLevel };
  };

  return (
    <main className="mx-auto max-w-[1440px] px-[2.38rem]">
      <h1 className="my-4 flex w-full justify-center text-2xl font-bold">
        클래스 작성
      </h1>

      {/* 상태 바  */}
      <ul className="flex h-[45px] w-full min-w-[675px] items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
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
            <form onSubmit={handleSubmit(updateDraft, invalid)}>
              <button className="flex items-center whitespace-nowrap rounded-md bg-black px-[0.87rem] py-[0.31rem] text-sm font-bold text-white">
                임시저장
              </button>
            </form>
            <form onSubmit={handleSubmit(onValid, invalid)}>
              <button className="ml-4 flex items-center">
                다음
                <ArrowRightSVG className="ml-3 h-[15px] w-[9px] stroke-black" />
              </button>
            </form>
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

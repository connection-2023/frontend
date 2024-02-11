'use client';

import { lazy, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { updateClassDraft } from '@/lib/apis/classApi';
import { useClassCreateStore } from '@/store/classCreate';
import { classOutputDataProcess } from '@/utils/apiDataProcessor';
import ClassCreate from './ClassCreate';
import ClassCreateNav from './ClassCreateNav';
import { classCreateData } from '@/types/class';

const ClassCategory = lazy(() => import('./ClassCategory'));
const ClassExplanation = lazy(() => import('./ClassExplanation'));
const ClassSchedule = lazy(() => import('./ClassSchedule'));
const ClassLocation = lazy(() => import('./ClassLocation'));
const ClassPrice = lazy(() => import('./ClassPrice'));

const NAV_STEPS = [
  {
    title: '사진, 카테고리 설정',
    svg: <div />,
    component: <ClassCategory />,
  },
  {
    title: '클래스 상세 설명',
    svg: <div />,
    component: <ClassExplanation />,
  },
  {
    title: '일정 및 공지사항',
    svg: <div />,
    component: <ClassSchedule />,
  },
  {
    title: '클래스 장소',
    svg: <div />,
    component: <ClassLocation />,
  },
  {
    title: '가격 설정',
    svg: <div />,
    component: <ClassPrice />,
  },
];

const ClassCreateContainer = ({
  currentStep,
  id,
}: {
  currentStep: number;
  id: string;
}) => {
  const formMethods = useForm<classCreateData>({ shouldFocusError: false });
  const { handleSubmit, reset, clearErrors } = formMethods;

  const { classData, setProcessedClassData } = useClassCreateStore((state) => ({
    classData: state.classData,
    setProcessedClassData: state.setProcessedClassData,
  }));

  const { changeParams } = useChangeSearchParams();

  const activeStep = classData?.step ?? 0;

  useEffect(() => {
    if (activeStep < currentStep) {
      changeStep(activeStep);
    }
  }, [currentStep]);

  const changeStep = (targetStep: number) => {
    changeParams({ name: 'step', value: String(targetStep) });
  };

  const inValidPreviousStep = (targetStep: number) => {
    clearErrors();
    reset();
    changeStep(targetStep);
  };

  const onValidPreviousStep = (targetStep: number) => {
    changeStep(targetStep);
  };

  const prevHandleSubmit = (targetStep: number) =>
    handleSubmit(
      () => onValidPreviousStep(targetStep),
      () => inValidPreviousStep(targetStep),
    );

  const inValidNextStep = (data: Record<string, any>) => {
    console.log(data);
  };

  const onValidNextStep = (data: classCreateData, targetStep: number) => {
    updateDrafts(data);
    changeStep(targetStep);
  };

  const nextHandleSubmit = (targetStep: number) =>
    handleSubmit(
      (data) => onValidNextStep(data, targetStep),
      (data) => inValidNextStep(data),
    );

  const updateDrafts = async (data: classCreateData) => {
    try {
      const processData = await classOutputDataProcess(data, currentStep);

      console.log(data);

      await updateClassDraft({
        lectureId: id!,
        step: currentStep,
        ...processData,
      });
      toast.success('임시저장 완료');
    } catch (error) {
      console.error(error);
      toast.error('임시저장 실패');
    }
  };

  return (
    <>
      <ClassCreateNav
        navSteps={NAV_STEPS}
        currentStep={Number(currentStep)}
        activeStep={activeStep}
        nextHandleSubmit={nextHandleSubmit}
        prevHandleSubmit={prevHandleSubmit}
      />
      <ClassCreate
        title={NAV_STEPS[currentStep].title}
        currentStep={currentStep}
        nextHandleSubmit={nextHandleSubmit}
        prevHandleSubmit={prevHandleSubmit}
      >
        <FormProvider {...formMethods}>
          {NAV_STEPS[currentStep].component}
        </FormProvider>
      </ClassCreate>
    </>
  );
};

export default ClassCreateContainer;

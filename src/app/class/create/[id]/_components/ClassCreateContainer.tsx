'use client';

import { lazy, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { getClassDraft, updateClassDraft } from '@/lib/apis/classApi';
import { useClassCreateStore } from '@/store/classCreate';
import { classOutputDataProcess } from '@/utils/apiDataProcessor';
import ClassCreate from './ClassCreate';
import ClassCreateNav from './ClassCreateNav';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { classCreateData } from '@/types/class';
import { ErrorMessage } from '@/types/types';

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
  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const formMethods = useForm<classCreateData>({ shouldFocusError: false });
  const { handleSubmit, clearErrors, reset } = formMethods;

  const { classData, setClassData, setProcessedClassData } =
    useClassCreateStore();

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

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const inValidPreviousStep = async (targetStep: number) => {
    try {
      clearErrors();

      if (activeStep > currentStep) {
        const draftsData = await getClassDraft(id);
        await setClassData(draftsData);
        reset();
      }

      changeStep(targetStep);
    } catch (error) {}
  };

  const onValidPreviousStep = (data: classCreateData, targetStep: number) => {
    updateDrafts(data);
    changeStep(targetStep);
  };

  const prevHandleSubmit = (targetStep: number) =>
    handleSubmit(
      (data) => onValidPreviousStep(data, targetStep),
      () => inValidPreviousStep(targetStep),
    );

  const inValidNextStep = (data: Record<string, any>) => {
    const invalidList = Object.entries(data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setInvalidData(invalidList);
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

  const updateDrafts = async (data: classCreateData, successView?: boolean) => {
    try {
      const processData = await classOutputDataProcess(data, currentStep);

      // if (processData) {
      //   formToClassDataProcess(processData, currentStep);
      // } 추후 inValidPreviousStep 변경 시 추가

      const step =
        activeStep > currentStep + (currentStep === 4 ? 0 : 1)
          ? activeStep
          : currentStep + (currentStep === 4 ? 0 : 1);

      setProcessedClassData({
        ...classData,
        step,
      });

      await updateClassDraft({
        lectureId: id!,
        step,
        ...processData,
      });

      if (successView) {
        toast.success('임시저장 완료');
      }
    } catch (error) {
      console.error(error);
      toast.error('임시저장 실패');
    }
  };

  const updateDraftsHandleSubmit = handleSubmit(
    (data) => updateDrafts(data, true),
    (data) => inValidNextStep(data),
  );

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
        updateDraftsHandleSubmit={updateDraftsHandleSubmit}
      >
        <FormProvider {...formMethods}>
          {NAV_STEPS[currentStep].component}
        </FormProvider>
      </ClassCreate>

      <ValidationMessage
        closeModal={closeValidationMessage}
        invalidData={invalidData}
      />
    </>
  );
};

export default ClassCreateContainer;

'use client';
import { useRouter } from 'next/navigation';
import { lazy, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  deleteClassDrafts,
  getClassDraft,
  updateClassDraft,
} from '@/lib/apis/classApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useClassScheduleStore } from '@/store';
import { useClassCreateStore } from '@/store/classCreate';
import { classCreate, classOutputDataProcess } from '@/utils/apiDataProcessor';
import ClassCreate from './ClassCreate';
import ClassCreateNav from './ClassCreateNav';
import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
import { classCreateData } from '@/types/class';
import { ErrorMessage, FetchError } from '@/types/types';

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

  const finalSchedule = useClassScheduleStore((state) => state.filteredDates);

  const { classData, setClassData, setProcessedClassData } =
    useClassCreateStore();

  const router = useRouter();

  const activeStep = classData?.step ?? 0;

  useEffect(() => {
    if (activeStep < currentStep) {
      changeStep(activeStep);
    }
  }, [currentStep]);

  const changeStep = (targetStep: number) => {
    router.push(`/class/create/${id}?step=${targetStep}`);
  };

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const inValidPreviousStep = async (targetStep: number) => {
    const inValidPreviousAction = async () => {
      if (activeStep > currentStep) {
        const draftsData = await getClassDraft(id);
        if (draftsData) await setClassData(draftsData);
        reset();
      }

      changeStep(targetStep);
    };

    try {
      clearErrors();
      await inValidPreviousAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await inValidPreviousAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  const onValidMoveStep = async (data: classCreateData, targetStep: number) => {
    try {
      await updateDrafts(data, false, true);
      changeStep(targetStep);
    } catch (error) {
      console.error(error);
    }
  };

  const prevHandleSubmit = (targetStep: number) =>
    handleSubmit(
      (data) => onValidMoveStep(data, targetStep),
      () => inValidPreviousStep(targetStep),
    );

  const inValidNextStep = (data: Record<string, any>) => {
    const invalidList = Object.entries(data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setInvalidData(invalidList);
  };

  const nextHandleSubmit = (targetStep: number) =>
    handleSubmit(
      (data) => onValidMoveStep(data, targetStep),
      (data) => inValidNextStep(data),
    );

  const updateDrafts = async (
    data: classCreateData,
    successView?: boolean,
    isThrow?: boolean,
  ) => {
    const updateDraftsAction = async () => {
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
    };

    try {
      await updateDraftsAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await updateDraftsAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('임시저장 실패');
          if (isThrow) {
            throw error;
          }
        }
      }
    }
  };

  const updateDraftsHandleSubmit = handleSubmit(
    (data) => updateDrafts(data, true),
    (data) => inValidNextStep(data),
  );

  const createClass = async (data: classCreateData) => {
    const createClassAction = async () => {
      await updateDrafts(data);
      const newLectureId = await classCreate(id, finalSchedule);

      toast.success('클래스 등록 완료');

      await deleteClassDrafts(id);
      router.push(`/class/${newLectureId}`);
    };

    try {
      await createClassAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await createClassAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  const createClassHandleSubmit = handleSubmit(
    (data) => createClass(data),
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
        createClassHandleSubmit={createClassHandleSubmit}
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

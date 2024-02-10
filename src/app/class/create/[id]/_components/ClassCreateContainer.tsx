'use client';

import { useRouter } from 'next/navigation';
import { lazy, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useClassCreateStore } from '@/store/classCreate';
import ClassCreate from './ClassCreate';
import ClassCreateNav from './ClassCreateNav';
import { classCreateData } from '@/types/class';

// const ClassExplanation = lazy(() => import('./ClassExplanation'));
// const ClassSchedule = lazy(() => import('./ClassSchedule'));
// const ClassLocation = lazy(() => import('./ClassLocation'));
// const ClassPrice = lazy(() => import('./ClassPrice'));

const NAV_STEPS = [
  {
    title: '사진, 카테고리 설정',
    svg: <div />,
    // component: <ClassCategory />,
  },
  {
    title: '클래스 상세 설명',
    svg: <div />,
    // component: <ClassExplanation />,
  },
  {
    title: '일정 및 공지사항',
    svg: <div />,
    // component: <ClassSchedule />,
  },
  {
    title: '클래스 장소',
    svg: <div />,
    // component: <ClassLocation />,
  },
  {
    title: '가격 설정',
    svg: <div />,
    // component: <ClassPrice />
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

  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
    setClassData: state.setClassData,
  }));

  const router = useRouter();

  const activeStep = classData?.step ?? 0;

  useEffect(() => {
    if (activeStep < currentStep) {
      router.push(`/class/create/${id}?step=${activeStep}`);
    }
  }, [currentStep]);

  return (
    <>
      <ClassCreateNav
        navSteps={NAV_STEPS}
        currentStep={Number(currentStep)}
        activeStep={activeStep}
      />
      <ClassCreate
        title={NAV_STEPS[currentStep].title}
        currentStep={currentStep}
      >
        <div>aaa</div>
      </ClassCreate>
    </>
  );
};

export default ClassCreateContainer;

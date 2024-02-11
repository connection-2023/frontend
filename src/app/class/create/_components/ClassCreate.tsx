// 'use client';
// import dynamic from 'next/dynamic';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState, lazy, useRef } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { ArrowRightSVG } from '@/icons/svg';
// import { createClassDraft, updateClassDraft } from '@/lib/apis/classApi';
// import { useClassScheduleStore } from '@/store';
// import { classCreate, classOutputDataProcess } from '@/utils/apiDataProcessor';
// import ValidationMessage from '@/components/ValidationMessage/ValidationMessage';
// import {
//   IGetClassDrafts,
//   IprocessedDraft,
//   classCreateData,
// } from '@/types/class';
// import { ErrorMessage } from '@/types/types';

// const DraftListModal = dynamic(() => import('./DraftListModal'), {
//   ssr: false,
// });

// interface ClassCreateProps {
//   step: string | undefined;
//   data: IprocessedDraft | null;
//   classDrafts: IGetClassDrafts[];
// }

// export default function ClassCreate({
//   step,
//   data,
//   classDrafts,
// }: ClassCreateProps) {
//   const roadClassData = useRef(data);
//   const [classData, setClassData] = useState<IprocessedDraft | null>(data);

//   const [activeStep, setActiveStep] = useState(data?.step ? data.step : 0);
//   const [currentStep, setCurrentStep] = useState(step ? Number(step) : 0);

//   const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
//   // const formMethods = useForm<classCreateData>({ shouldFocusError: false });
//   const { handleSubmit, reset } = formMethods;

//   const finalSchedule = useClassScheduleStore((state) => state.filteredDates);

//   const [draftModalView, setDraftModalView] = useState(false);
//   const [classDraftList, setClassDraftList] =
//     useState<IGetClassDrafts[]>(classDrafts);

//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (data) {
//       const searchParamsStep = Number(step ?? 0);
//       const isValidStep =
//         !isNaN(searchParamsStep) && searchParamsStep - 1 <= (data?.step || 0);

//       if (isValidStep) {
//         setActiveStep(data?.step ? data.step : 0);
//         setCurrentStep(searchParamsStep);
//       } else {
//         router.back();
//       }
//     }

//     if (!classData) {
//       reset();
//       setClassData(data);
//     }

//     if (!classData && classDraftList.length > 0 && (step === '0' || !step)) {
//       setDraftModalView(true);
//     } else {
//       setDraftModalView(false);
//     }

//     if (!step) {
//       reset();
//       setClassData(null);
//       setCurrentStep(0);
//       setActiveStep(0);
//       if (classDraftList.length > 0) {
//         setDraftModalView(true);
//       }
//     }
//   }, [step]);

//   const steps = [
//     {
//       title: '사진, 카테고리 설정',
//       component: <ClassCategory classData={classData} />,
//     },
//     {
//       title: '클래스 상세 설명',
//       component: <ClassExplanation classData={classData} />,
//     },
//     {
//       title: '일정 및 공지사항',
//       component: <ClassSchedule classData={classData} />,
//     },
//     {
//       title: '클래스 장소',
//       component: <ClassLocation classData={classData} />,
//     },
//     { title: '가격 설정', component: <ClassPrice classData={classData} /> },
//   ];

//   const closeDraftsModal = () => {
//     setDraftModalView(false);
//   };

//   const changeDraftList = (draftList: IGetClassDrafts[]) => {
//     setClassDraftList(draftList);
//   };

//   const moveStep = (step: number | string) => {
//     if (classData) {
//       router.push(`${pathname}?step=${step}&id=${classData.id}`);
//     }
//   };

//   const nextStep = () => {
//     moveStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     moveStep(currentStep - 1);
//   };

//   const navOnValidHandler = async (data: classCreateData, index: number) => {
//     if (classData?.id && currentStep < index) {
//       await updateDraft(data, classData.id);
//     }
//     moveStep(index);
//   };

//   const navinvalidHandler = (
//     invalidData: Record<string, any>,
//     index: number,
//   ) => {
//     const moveUnderStep = () => {
//       if (roadClassData.current) {
//         reset();
//       }
//       moveStep(index);
//     };

//     activeStep < index ? invalid(invalidData) : moveUnderStep();
//   };

//   const onValid = async (data: classCreateData) => {
//     let id;
//     if (!classData?.id && classDraftList.length < 5) {
//       id = await createDraft(data.title);
//     } else {
//       toast.error(
//         `임시저장은 최대 5개까지 가능 합니다. 불러오기 혹은 삭제 후 진행해주세요.`,
//       );
//       return setDraftModalView(true);
//     }
//     await updateDraft(data, id);
//     nextStep();
//   };

//   const invalid = (data: Record<string, any>) => {
//     const invalidList = Object.entries(data).map(([key, value]) => ({
//       key,
//       ...value,
//     }));

//     setInvalidData(invalidList);
//   };

//   const closeValidationMessage = () => {
//     setInvalidData(null);
//   };

//   const createDraft = async (title: string) => {
//     const { id } = await createClassDraft();

//     const draftsData = {
//       id,
//       updatedAt: new Date(),
//       title,
//       step: 0,
//     };

//     setClassDraftList((prev) => [...prev, draftsData]);

//     if (!data) {
//       router.push(`/class/create?step=1&id=${id}`);
//     }
//     return id;
//   };

//   const updateDraft = async (data: classCreateData, id: number) => {
//     const step = Math.max(activeStep, currentStep);

//     if (step !== activeStep) {
//       setActiveStep(step);
//     }

//     try {
//       setClassData({
//         ...classData,
//         step,
//         id,
//       });

//       const processData = await classOutputDataProcess(data, currentStep);

//       await updateClassDraft({
//         lectureId: id!,
//         step,
//         ...processData,
//       });
//       toast.success('임시저장 완료');
//     } catch (error) {
//       console.error(error);
//       toast.error('임시저장 실패');
//     }
//   };

//   const createClass = async (data: classCreateData) => {
//     try {
//       if (classData && classData.id) {
//         await updateDraft(data, classData.id);
//         const newLectureId = await classCreate(classData.id, finalSchedule);

//         if (newLectureId) {
//           toast.success('클래스 등록 완료');
//           router.replace(`/class/${newLectureId}`);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('클래스 등록 실패');
//     }
//   };

//   return (
//     <main className="mx-auto max-w-[1440px] px-[2.38rem]">
//       <h1 className="my-4 flex w-full justify-center text-2xl font-bold">
//         클래스 작성
//       </h1>

//       {/* 상태 바  */}
//       <nav className="flex h-[45px] w-full min-w-[675px] items-center justify-between whitespace-nowrap rounded-[3.13rem] text-lg font-bold shadow-float">
//         {steps.map((step, index) => (
//           <form
//             className={`group flex h-full flex-grow items-center justify-center rounded-[3.13rem] px-1 ${
//               currentStep === index
//                 ? 'bg-sub-color1 text-white'
//                 : 'text-gray-500'
//             } ${
//               activeStep + 1 >= index && currentStep !== index
//                 ? 'hover:bg-[#8338ec] hover:bg-opacity-50 hover:text-white'
//                 : 'pointer-events-none'
//             } `}
//             key={step.title}
//             onSubmit={handleSubmit(
//               (data) => navOnValidHandler(data, index),
//               (data) => navinvalidHandler(data, index),
//             )}
//           >
//             <button className="flex flex-grow items-center justify-center gap-2">
//               <span
//                 className={`flex h-6 w-6 items-center justify-center rounded-full ${
//                   currentStep === index
//                     ? 'bg-white text-sub-color1'
//                     : 'bg-gray-500 text-white'
//                 }
//               ${
//                 activeStep + 1 >= index &&
//                 currentStep !== index &&
//                 'group-hover:bg-white group-hover:text-sub-color1'
//               }`}
//               >
//                 {index + 1}
//               </span>
//               {step.title}
//             </button>
//           </form>
//         ))}
//       </nav>
//       <section className="mx-auto flex max-w-[675px] flex-col">
//         <h2 className="mt-8 flex items-center text-2xl font-bold text-sub-color1">
//           <span
//             className="mr-2 flex h-7 w-7
// items-center justify-center rounded-full border border-solid border-sub-color1 text-lg"
//           >
//             {currentStep + 1}
//           </span>
//           {steps[currentStep].title}
//         </h2>

//         {/* 해당 컴포넌트*/}
//         <FormProvider {...formMethods}>
//           {steps[currentStep].component}
//         </FormProvider>

//         {/* 하단 버튼 */}
//         <nav className="my-10 flex w-full justify-between text-lg font-bold">
//           <button onClick={prevStep} className="flex items-center">
//             <ArrowRightSVG className="mr-2 h-[15px] w-[9px] origin-center rotate-180 stroke-black" />
//             이전
//           </button>
//           <div className="flex">
//             <form
//               onSubmit={handleSubmit((data) => updateDraft(data, 11), invalid)}
//             >
//               <button className="flex items-center whitespace-nowrap rounded-md bg-black px-[0.87rem] py-[0.31rem] text-sm font-bold text-white">
//                 임시저장
//               </button>
//             </form>
//             {currentStep !== 4 ? (
//               <form onSubmit={handleSubmit(onValid, invalid)}>
//                 <button className="ml-4 flex items-center">
//                   다음
//                   <ArrowRightSVG className="ml-3 h-[15px] w-[9px] stroke-black" />
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleSubmit(createClass, invalid)}>
//                 <button className="ml-4 flex items-center">등록하기</button>
//               </form>
//             )}
//           </div>
//         </nav>
//       </section>

//       <DraftListModal
//         draftModalView={draftModalView}
//         closeDraftsModal={closeDraftsModal}
//         classDrafts={classDraftList}
//         changeDraftList={changeDraftList}
//       />

//       {/* 유효성 토스트 메세지 */}
//       <ValidationMessage
//         closeModal={closeValidationMessage}
//         invalidData={invalidData}
//       />
//     </main>
//   );
// }

'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next-nprogress-bar';
import { useState, lazy } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getOriginalClassInfo, updateClassData } from '@/lib/apis/classApis';
import { deleteImage } from '@/lib/apis/imageApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { uploadImageFilesWithFallback } from '@/utils/apiDataProcessor';
import EditButtons from './_components/EditButtons';
import IntroSection from './_components/IntroSection';
import Loading from './_components/Loading';
import NonEditableSection from './_components/NonEditableSection';
import PlanSection from './_components/plan';
import PriceSection from './_components/PriceSection';
import SideNavbar from './_components/SideNavbar';
import {
  filteredAddedSchedules,
  getNewRegularSchedule,
} from './_lib/addScheduleUtils';
import UploadImage from '@/components/UploadImage/UploadImage';
import { IClassEditRequest } from '@/types/class';
import { ErrorMessage, FetchError } from '@/types/types';

const TextAreaSection = dynamic(
  () => import('@/components/TextArea/TextAreaSection'),
  {
    ssr: false,
  },
);

const ValidationMessage = lazy(
  () => import('@/components/ValidationMessage/ValidationMessage'),
);

const ClassEditPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data: classData, isLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: () => getOriginalClassInfo(id),
  });

  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const router = useRouter();

  const formMethods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const authUser = useUserStore((state) => state.authUser);
  const userType = useUserStore((state) => state.userType);

  if (isLoading || !classData) return <Loading />;

  if (
    userType !== 'lecturer' &&
    authUser &&
    Number(authUser.id) !== classData.id
  )
    throw Error('권한이 없습니다!');

  const {
    startDate: initialStartDate,
    locationDescription,
    lectureImage,
    schedules: initialSchedules,
    daySchedules,
    regularLectureStatus,
  } = classData;

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const onSubmit = async (data: any) => {
    let reqData: IClassEditRequest;

    try {
      const { images, curriculum, maxCapacity, endDate, schedules, holidays } =
        data;

      curriculum.deletedImages.forEach(
        async ({ src }: { src: string }) =>
          await deleteImage({ imageUrl: src }),
      );

      const newMaxCapacity = maxCapacity
        ? { maxCapacity: maxCapacity.value }
        : {};

      // 추가된 스케쥴만 필터링
      const finalSchedules = (() => {
        if (daySchedules && initialSchedules) {
          // 요일별 원데이
          const schedulesData = filteredAddedSchedules(
            initialSchedules,
            schedules,
            initialStartDate,
            endDate.endDate,
            holidays,
          );

          return {
            daySchedules: schedules,
            schedules: schedulesData,
          };
        }

        if (regularLectureStatus) {
          // 정기 클래스
          const newRegularSchedules = getNewRegularSchedule(
            regularLectureStatus,
            schedules,
          );

          return {
            regularSchedules: newRegularSchedules,
          };
        }
      })();

      reqData = {
        ...data,
        images: await uploadImageFilesWithFallback(images, 'lectures'),
        curriculum: curriculum.content,
        ...newMaxCapacity,
        ...finalSchedules,
        endDate: new Date(endDate.endDate),
      };

      await updateClassData(id, reqData);
      toast.success('클래스 수정 완료');
      router.push(`/class/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await updateClassData(id, reqData!);
          } catch (error) {
            console.error(error);
            toast.error('잘못된 요청입니다!');
          }
        }
      }
      console.error(error);
    }
  };

  const invalid = (data: Record<string, any>) => {
    const invalidList = Object.entries(data).map(([key, value]) => ({
      key,
      ...value,
    }));

    setInvalidData(invalidList);
  };

  const handleEditCancel = () => {
    const confirm = window.confirm('클래스 수정을 취소하겠습니까?');
    if (confirm) {
      router.push(`/class/${id}`);
    }
  };

  return (
    <div className="border-box mt-5 box-border grid grid-cols-1 gap-x-12 px-4 md:grid-cols-[1fr_3fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr] xl:px-0">
      <section className="mb-4 flex w-full flex-col items-center border-b border-solid border-gray-500 md:col-span-2 xl:col-span-3">
        {/* 클래스 이미지 */}
        <div
          id="images"
          className="mb-5 flex h-fit w-full justify-center px-10"
        >
          <Controller
            name="images"
            control={control}
            defaultValue={lectureImage}
            rules={{
              required: '이미지',
            }}
            render={({ field }) => (
              <UploadImage
                onChange={field.onChange}
                defaultImg={field.value}
                errors={errors.images}
              />
            )}
          />
        </div>

        {/* 수정 불가 클래스 기본 정보 */}
        <NonEditableSection {...classData} />
      </section>

      {/* navbar */}
      <SideNavbar onClick={handleSubmit(onSubmit, invalid)} />

      <div>
        <FormProvider {...formMethods}>
          <section id="intro" className="flex flex-col gap-8 py-12">
            <IntroSection data={classData} />
          </section>

          {/* 클래스 일정 및 시간 */}
          <section id="plan">
            <PlanSection control={control} data={classData} errors={errors} />
          </section>

          {/* 진행 장소 설명 */}
          <section
            id="location"
            className="whitespace-nowrap text-lg font-semibold"
          >
            <div className="py-6">
              <Controller
                name="locationDescription"
                control={control}
                defaultValue={locationDescription}
                render={({ field }) => (
                  <TextAreaSection
                    placeholder="수업장소까지 가는 방법, 추천 교통편, 주차시설 유무 등에 대한 정보를 입력해주세요."
                    maxLength={500}
                    dataName="locationDescription"
                    defaultValue={field.value}
                    title="진행 장소 추가 설명"
                  />
                )}
              />
            </div>
          </section>

          {/* 가격 설정 */}
          <section
            id="price"
            className="whitespace-nowrap text-lg font-semibold"
          >
            <PriceSection control={control} data={classData} errors={errors} />
          </section>
        </FormProvider>
      </div>

      <EditButtons
        handleSubmit={handleSubmit}
        handleEditCancel={handleEditCancel}
        invalid={invalid}
        onSubmit={onSubmit}
      />

      {/* 유효성 토스트 메세지 */}
      <ValidationMessage
        title="하기 값(들)을 확인해 주세요."
        closeModal={closeValidationMessage}
        invalidData={invalidData}
      />
    </div>
  );
};

export default ClassEditPage;

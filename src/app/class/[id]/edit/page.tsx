'use client';
import { useQuery } from '@tanstack/react-query';
import isSameDay from 'date-fns/isSameDay';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, lazy } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ANNOUNCEMENT, CLASS_OPERATION_PLAN } from '@/constants/constants';
import { CLASS_EDIT_STYLE } from '@/constants/constants';
import { TimeSVG } from '@/icons/svg';
import { getOriginalClassInfo, updateClassData } from '@/lib/apis/classApis';
import { deleteImage } from '@/lib/apis/imageApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { uploadImageFilesWithFallback } from '@/utils/apiDataProcessor';
import {
  formatDateWithHyphens,
  parseHyphenatedDate,
} from '@/utils/dateTimeUtils';
import createOptions from '@/utils/generateStudentCountOptions';
import {
  formatScheduleDays,
  generateDatesFromNewEndDate,
} from '@/utils/parseUtils';
import AddSchedules from './_components/AddSchedules';
import EditButtons from './_components/EditButtons';
import EditClassRange from './_components/EditClassRange';
import EditDayoff from './_components/EditDayoff';
import Loading from './_components/Loading';
import NonEditableSection from './_components/NonEditableSection';
import SideNavbar from './_components/SideNavbar';
import { filteredAddedSchedules } from './_lib/addScheduleUtils';
import NumberSelect from '../../create/[id]/_components/NumberSelect';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import UploadImage from '@/components/UploadImage/UploadImage';
import { IClassEditRequest } from '@/types/class';
import { ErrorMessage, FetchError } from '@/types/types';

const CustomEditor = dynamic(
  () => import('@/components/TextArea/CustomEditor'),
  {
    ssr: false,
  },
);

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
  const { data, isLoading, error } = useQuery({
    queryKey: ['class', id],
    queryFn: () => getOriginalClassInfo(id),
    refetchOnWindowFocus: 'always',
  });

  const [invalidData, setInvalidData] = useState<null | ErrorMessage[]>(null);
  const [newEndDate, setNewEndDate] = useState<string>('');
  const router = useRouter();

  const formMethods = useForm();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const authUser = useUserStore((state) => state.authUser);
  const userType = useUserStore((state) => state.userType);
  const newSchedules: Date[] = watch('schedules') || [];

  if (isLoading) return <Loading />;
  if (!data || data instanceof Error || error) {
    return;
  }

  if (
    userType !== 'lecturer' &&
    authUser &&
    data &&
    Number(authUser.id) !== data.id
  )
    return null;

  const {
    isGroup,
    duration,
    price,
    maxCapacity,
    introduction,
    curriculum,
    startDate,
    endDate,
    locationDescription,
    reservationDeadline,
    lectureImage,
    reservationComment,
    notification,
    schedule,
  } = data;

  const formatSchedule = schedule.map((item) => new Date(item.startDateTime));

  const formatSchedules = (): Date[] => {
    // 전체 기간에 맞게 클래스 일정 조정
    if (!newEndDate) return [];
    if (
      data.daySchedule &&
      !isSameDay(new Date(data.endDate), new Date(newEndDate))
    ) {
      return [
        ...formatSchedule,
        ...generateDatesFromNewEndDate(
          data.endDate,
          newEndDate,
          data.daySchedule,
        ),
      ];
    } else return formatSchedule;
  };

  const closeValidationMessage = () => {
    setInvalidData(null);
  };

  const onSubmit = async (data: any) => {
    let reqData: IClassEditRequest;

    try {
      const { images, curriculum, maxCapacity, endDate } = data;

      curriculum.deletedImages.forEach(
        async ({ src }: { src: string }) =>
          await deleteImage({ imageUrl: src }),
      );

      // 추가된 스케쥴만 필터링
      const schedulesData = filteredAddedSchedules(
        formatSchedule,
        newSchedules,
        data.daySchedule,
        newEndDate,
        endDate,
      );

      reqData = {
        ...data,
        images: await uploadImageFilesWithFallback(images, 'lectures'),
        curriculum: curriculum.content,
        maxCapacity: maxCapacity.value,
        ...schedulesData,
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
    <div className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 px-4 md:grid-cols-[1fr_3fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr] xl:px-0">
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
        <NonEditableSection {...data} />
      </section>

      {/* navbar */}
      <SideNavbar onClick={handleSubmit(onSubmit, invalid)} />

      <div>
        <FormProvider {...formMethods}>
          <section id="intro" className="flex flex-col gap-8 py-12">
            {/* 공지사항 */}
            <TextAreaSection
              maxLength={200}
              dataName="notification"
              placeholder={ANNOUNCEMENT}
              defaultValue={notification.content}
              title="중요 공지사항을 입력해주세요"
            />

            {/* 운영계획 */}
            <TextAreaSection
              maxLength={500}
              dataName="introduction"
              defaultValue={introduction}
              placeholder={CLASS_OPERATION_PLAN}
              title="어떤 클래스를 운영할 계획 인가요?"
              height="h-40"
            />

            {/* 커리큘럼 */}
            <CustomEditor
              title="커리큘럼"
              dataName="curriculum"
              defaultValue={curriculum}
              height="652px"
              maxLength={3000}
              minLength={200}
              requiredMark={false}
            />
          </section>

          {/* 클래스 일정 및 시간 */}
          <section id="plan">
            <Controller
              name="endDate"
              control={control}
              defaultValue={{
                startDate: formatDateWithHyphens(startDate),
                endDate: formatDateWithHyphens(endDate),
              }}
              rules={{
                required: '전체 클래스 기간',
                validate: ({ startDate, endDate }) => {
                  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
                  const isValidStartDate = dateFormat.test(startDate);
                  const isValidEndDate = dateFormat.test(endDate);
                  const parsedStartDate = parseHyphenatedDate(startDate);
                  const parsedEndDate = parseHyphenatedDate(endDate);

                  if (
                    !isValidStartDate ||
                    !isValidEndDate ||
                    !formatDateWithHyphens(parsedStartDate) === startDate ||
                    !formatDateWithHyphens(parsedEndDate) === endDate
                  ) {
                    return '올바른 클래스 기간';
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <div className={`${CLASS_EDIT_STYLE.border} py-6`}>
                  <h2
                    id="classRange"
                    className={`${CLASS_EDIT_STYLE.h2} ${
                      errors.endDate && 'animate-vibration text-main-color'
                    }`}
                  >
                    전체 클래스 기간을 설정해주세요
                  </h2>
                  <div className="flex gap-x-4">
                    <EditClassRange
                      defaultValue={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        setNewEndDate(newValue.endDate);
                      }}
                    />
                    <p className="flex items-center gap-x-2">
                      <TimeSVG className="fill-sub-color1" /> {duration}분
                    </p>
                  </div>

                  <ul>
                    {data.daySchedule &&
                      formatScheduleDays(data.daySchedule, duration).map(
                        (list, index) => (
                          <li key={index}>
                            <p className="mt-4 flex items-center gap-1.5 text-base">
                              <span className="h-[7px] w-[7px] rounded-full bg-sub-color1" />
                              {list}
                            </p>
                          </li>
                        ),
                      )}
                  </ul>
                </div>
              )}
            />

            {/* 휴무일 */}
            {data.daySchedule ? (
              <Controller
                name="holidays"
                control={control}
                defaultValue={{
                  schedules: data.schedule,
                  holidays: data.holidayArr,
                }}
                render={({ field }) => (
                  <div className={`${CLASS_EDIT_STYLE.border} py-6`}>
                    <h2 className={CLASS_EDIT_STYLE.h2}>휴무일이 있나요?</h2>

                    <EditDayoff
                      onChange={field.onChange}
                      defaultValue={{
                        schedules: formatSchedule,
                        holidays: data.holidayArr,
                      }}
                    />
                  </div>
                )}
              />
            ) : (
              <Controller
                name="schedules"
                control={control}
                defaultValue={{
                  range: { startDate, endDate },
                  schedules: data.schedule,
                }}
                render={({ field }) => (
                  <div className={`${CLASS_EDIT_STYLE.border} py-6`}>
                    <h2 className={CLASS_EDIT_STYLE.h2}>클래스 일정 및 시간</h2>

                    <AddSchedules
                      onChange={field.onChange}
                      defaultValue={{
                        range: { startDate, endDate: newEndDate },
                        schedules: formatSchedule,
                      }}
                      duration={duration}
                    />
                  </div>
                )}
              />
            )}
            {/* 클래스 횟수 */}
            <section className={`${CLASS_EDIT_STYLE.border} py-6`}>
              <h2 className={CLASS_EDIT_STYLE.h2}>
                총 클래스 횟수
                <span className="ml-10">
                  {data.daySchedule
                    ? formatSchedules.length
                    : newSchedules.length}
                  회
                </span>
              </h2>

              <div className="mt-4 max-w-[40rem]">
                <ScheduleView
                  maxCapacity={maxCapacity}
                  duration={duration}
                  lectureSchedule={
                    data.daySchedule ? formatSchedules() : newSchedules
                  }
                />
              </div>
            </section>
            {/* 신청 마감 시간 */}
            <Controller
              name="reservationDeadline"
              control={control}
              defaultValue={reservationDeadline}
              rules={{
                required: '신청 마감 시간',
                min: { value: 1, message: '올바른 마감 시간' },
              }}
              render={({ field }) => (
                <div className={`${CLASS_EDIT_STYLE.border} py-6`}>
                  <h2
                    id="reservationDeadline"
                    className={`${CLASS_EDIT_STYLE.h2} ${
                      errors.reservationDeadline &&
                      'animate-vibration text-main-color'
                    }`}
                  >
                    신청 마감 시간을 설정해주세요
                  </h2>
                  <div className="ml-[0.38rem] text-sm font-medium text-gray-100">
                    <span>수업 시작</span>
                    <input
                      type="number"
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      className="ml-[1.38rem] mr-[0.38rem] h-8 w-12 rounded-md border border-solid border-gray-500 px-[0.81rem] py-1 focus:outline-sub-color1"
                      aria-label="신청 마감 시간"
                    />
                    <span>시간 전</span>
                  </div>
                </div>
              )}
            />

            {/* 예약시 유의사항 */}
            <Controller
              name="reservationComment"
              control={control}
              defaultValue={reservationComment}
              rules={{
                required: '예약 시 유의사항',
              }}
              render={({ field }) => (
                <div className={`${CLASS_EDIT_STYLE.border} py-6`}>
                  <h2
                    id="reservationComment"
                    className={`${CLASS_EDIT_STYLE.h2} ${
                      errors.reservationComment &&
                      'animate-vibration text-main-color'
                    }`}
                  >
                    예약시 유의사항
                  </h2>
                  <textarea
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다. \n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
                    className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-700 p-2"
                  />
                </div>
              )}
            />

            {/* 진행 장소 설명 */}
            <div className="felx flex-col py-6">
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
            {isGroup && (
              <div
                className={`flex ${CLASS_EDIT_STYLE.border} items-center py-4`}
              >
                <p className="mr-10 w-28">1회 최대 수강생</p>
                <Controller
                  name="maxCapacity"
                  control={control}
                  defaultValue={{ value: maxCapacity, label: maxCapacity }}
                  rules={{
                    required: '최대 수강생',
                  }}
                  render={({ field }) => (
                    <NumberSelect
                      instanceId="maxCapacity"
                      value={field.value}
                      onChange={field.onChange}
                      options={createOptions(maxCapacity, 100)}
                    />
                  )}
                />
                <div className="ml-1">명</div>
              </div>
            )}

            <div className="mb-10 flex py-4">
              <p
                id="price"
                className={`mr-10 w-28 ${
                  errors.price && 'animate-vibration text-main-color'
                }`}
              >
                가격 설정
              </p>

              <Controller
                name="price"
                control={control}
                defaultValue={price}
                rules={{
                  required: '가격',
                  min: { value: 1, message: '올바른 가격' },
                }}
                render={({ field }) => (
                  <div className="ml-[0.38rem] text-gray-100">
                    <span>1회당</span>
                    <input
                      type="number"
                      className="ml-7 mr-1 h-8 w-24 rounded-md border border-solid border-gray-700 px-2 text-right focus:outline-sub-color1"
                      defaultValue={field.value}
                      onChange={field.onChange}
                      aria-label="가격 설정"
                    />
                    <span>원</span>
                  </div>
                )}
              />
            </div>
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

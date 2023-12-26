'use client';
import { parse, format, parseISO } from 'date-fns';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import EditClassRange from './_components/EditClassRange';
import EditDayoff from './_components/EditDayoff';
import SideNavbar from './_components/SideNavbar';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import CustomEditor from '@/components/TextArea/CustomEditor';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import UploadImage from '@/components/UploadImage/UploadImage';
import { IClassEditData } from '@/types/class';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  GenreSVG,
} from '@/icons/svg';
import { getOriginalClassInfo } from '@/lib/apis/classApis';
import { useUserStore } from '@/store/userStore';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';

const borderStyle = 'border-b border-solid border-gray-700';
const h2Style = 'mb-4 flex items-center text-lg font-bold';
const h3Style = 'flex gap-1.5 text-sm';

const ClassEditPage = () => {
  const [initData, setInitData] = useState<IClassEditData | undefined>();
  const path = usePathname();
  const postId = path.split('/')[2];
  const { control, watch, handleSubmit } = useForm();
  const watchClassRange = watch('classRange');
  const authUser = useUserStore((state) => state.authUser);
  const userType = useUserStore((state) => state.userType);

  useEffect(() => {
    const classOriginalData = async () => {
      const data = await getOriginalClassInfo(postId);
      console.log(data);
      setInitData(data);
    };
    classOriginalData();
  }, [postId]);

  if (!initData) return null;
  //   강사 id랑 글 강사 Id 확인하기
  //   if (userType !== 'lecturer' && authUser?.id !== initData.lecturer.id)
  //     return null;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const {
    title,
    difficultyLevel,
    isGroup,
    duration,
    price,
    maxCapacity,
    introduction,
    curriculum,
    startDate,
    endDate,
    locationDescription,
    lectureToRegion,
    detailAddress,
    reservationDeadline,
    lectureToDanceGenre,
    lectureNotification,
    lectureImage,
    reservationComment,
  } = initData?.lecture;
  const { notification } = lectureNotification;
  const dateRange = {
    startDate: format(parseISO(startDate), 'yyyy-MM-dd'),
    endDate: format(parseISO(endDate), 'yyyy-MM-dd'),
  };

  const formatSchedules = () => {
    // 전체 기간에 맞게 클래스 일정 조정 예정
    return initData?.schedule;
  };

  return (
    <main className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 px-4 md:grid-cols-[1fr_3fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr] xl:px-0">
      <section className="mb-4 flex w-full flex-col items-center border-b border-solid border-gray-500 md:col-span-2 xl:col-span-3">
        {/* 클래스 이미지 */}
        <div className="mb-5 flex h-[18rem] w-full justify-center px-10">
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
                //errors={errors.images}
              />
            )}
          />
        </div>

        <h1 className="relative flex w-full max-w-[40rem] px-4 text-lg font-bold md:justify-center">
          <p className="w-11/12 md:text-center">{title}</p>
        </h1>

        <hr className="mb-4 h-1 w-full max-w-[40rem] md:mb-6" />

        {/* 수정 불가 클래스 기본 정보 */}
        <div className="mb-4 grid w-full max-w-[40rem] grid-cols-2 gap-y-3.5 px-4 md:mb-7 md:flex md:flex-wrap md:justify-items-center md:gap-x-10 md:whitespace-nowrap">
          <h3 className={h3Style}>
            <LocationSVG />
            <span className="w-fit break-keep">
              {formatLocationToString(lectureToRegion)}
            </span>
          </h3>
          <h3 className={h3Style}>
            <GenreSVG />
            <span className="w-fit break-keep">
              {formatGenreToString(lectureToDanceGenre)}
            </span>
          </h3>

          <h3 className={h3Style}>
            <TimeSVG /> {duration}분
          </h3>
          <h3 className={h3Style}>
            <GroupSVG />
            {isGroup ? `그룹레슨 (${maxCapacity}인)` : '개인레슨'}
          </h3>
          <h3 className={h3Style}>
            <LevelSVG /> {difficultyLevel}
          </h3>
        </div>
      </section>

      {/* navbar */}
      <SideNavbar onClick={handleSubmit(onSubmit)} />

      <div>
        {/* 공지사항 */}

        {/* 운영계획 */}

        {/* 커리큘럼 */}

        {/* 클래스 일정 및 시간 */}
        <section id="plan">
          <Controller
            name="classRange"
            control={control}
            defaultValue={dateRange}
            rules={{
              required: '전체 클래스 기간',
              validate: ({ startDate, endDate }) => {
                const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
                const isValidStartDate = dateFormat.test(startDate);
                const isValidEndDate = dateFormat.test(endDate);

                const parsedStartDate = parse(
                  startDate,
                  'yyyy-MM-dd',
                  new Date(),
                );
                const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());

                if (
                  !isValidStartDate ||
                  !isValidEndDate ||
                  !format(parsedStartDate, 'yyyy-MM-dd') === startDate ||
                  !format(parsedEndDate, 'yyyy-MM-dd') === endDate
                ) {
                  return '올바른 클래스 기간';
                }

                return true;
              },
            }}
            render={({ field }) => (
              <div className={`${borderStyle} py-6`}>
                <h2 className={h2Style}>전체 클래스 기간을 설정해주세요</h2>
                <div className="flex gap-x-4">
                  <EditClassRange
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                  <p className="flex items-center gap-x-2">
                    <TimeSVG /> {duration}분
                  </p>
                </div>

                {/* 추후 데이터 변경 필요 */}
                <p className="mt-4 flex items-center gap-1.5 text-base">
                  <span className="h-[7px] w-[7px] rounded-full bg-sub-color1" />
                  월,수,금 15:00-16:00
                </p>

                {/* <div className="max-w-[37.4rem]">
                  <ScheduleView
                    maxCapacity={maxCapacity}
                    duration={duration}
                    lectureSchedule={formatSchedules()}
                  />
                </div> */}
              </div>
            )}
          />

          {/* 휴무일 */}
          <Controller
            name="holidays"
            control={control}
            defaultValue={{
              schedules: initData?.schedule,
              holidays: initData?.holidayArr,
            }}
            render={({ field }) => (
              <div className={`${borderStyle} py-6`}>
                <h2 className={h2Style}>휴무일이 있나요?</h2>

                <EditDayoff
                  onChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />

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
              <div className={`${borderStyle} py-6`}>
                <h2 className={h2Style}>신청 마감 시간을 설정해주세요</h2>
                <div className="ml-[0.38rem] text-sm font-medium text-gray-100">
                  <span>수업 시작</span>
                  <input
                    type="number"
                    defaultValue={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    className="ml-[1.38rem] mr-[0.38rem] h-8 w-12 rounded-md border border-solid border-gray-500 px-[0.81rem] py-1 focus:outline-sub-color1"
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
              <div className={`${borderStyle} py-6`}>
                <h2 className={h2Style}>예약시 유의사항</h2>
                <textarea
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다. \n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
                  className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-700 p-2"
                />
              </div>
            )}
          />
        </section>
        {/* 진행 장소 */}

        {/* 가격 설정 */}
        <section id="price" className="text-lg font-semibold">
          <div className={`flex ${borderStyle} py-4`}>
            <p className="mr-10 w-28">총 클래스 횟수</p>
            <p>{initData.schedule.length}회</p>
          </div>

          <div className={`flex ${borderStyle} py-4`}>
            <p className="mr-10 w-28">1회 최대 수강생</p>
            <div>명</div>
          </div>

          <div className="mb-10 flex py-4">
            <p className="mr-10 w-28">가격 설정</p>

            <Controller
              name="price"
              control={control}
              defaultValue={price}
              rules={{
                required: '가격',
              }}
              render={({ field }) => (
                <div className="ml-[0.38rem] text-gray-100">
                  <span>1회당</span>
                  <input
                    type="number"
                    className="ml-7 mr-1 h-8 w-24 rounded-md border border-solid border-gray-700 px-2 text-right focus:outline-sub-color1"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                  <span>원</span>
                </div>
              )}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ClassEditPage;

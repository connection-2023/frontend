import { parse, format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Controller,
  FieldErrors,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dummyClass } from '@/constants/dummy';
import { classTimeState, classDatesState } from '@/recoil/ClassSchedule/atoms';
import { useClassCreateStore } from '@/store/classCreate';
import ClassDay from './ClassSchedule/ClassDay/ClassDay';
import ClassRange from './ClassSchedule/ClassRange/ClassRange';
import DayOff from './ClassSchedule/DayOff/DayOff';
import ScheduleView from '@/components/ScheduleView/ScheduleView';

const ClassSchedule = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { classData, setProcessedClassData } = useClassCreateStore();

  const [deadline, setDeadline] = useState<number | null>(null);

  const [classTime, setClassTime] = useRecoilState(classTimeState);
  const classDates = useRecoilValue(classDatesState);
  const classNum = classDates?.length;
  const { lectureSchedule } = dummyClass;

  const [classNotification, setClassNotification] = useState('');
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClassNotification(event.target.value);
  };
  //to은서: 29~34라인 내가 볼땐 필요 없어 보이는데 필요 없으면 제거 해줘

  useEffect(() => {
    if (classData?.duration) {
      setClassTime(classData.duration);
    }

    if (classData?.reservationDeadline) {
      setDeadline(classData?.reservationDeadline);
    }
  }, [classData]);
  return (
    <>
      <Controller
        name="classRange"
        control={control}
        defaultValue={classData?.classRange}
        rules={{
          required: '전체 클래스 기간',
          validate: ({ startDate, endDate }) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
            const isValidStartDate = dateFormat.test(startDate);
            const isValidEndDate = dateFormat.test(endDate);

            const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
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
          <Section
            title="전체 클래스 기간을 설정해주세요"
            error={!!errors.classRange?.message}
            id={field.name}
          >
            <ClassRange defaultValue={field.value} onChange={field.onChange} />
          </Section>
        )}
      />

      {/* 진행시간 */}
      <Controller
        name="duration"
        control={control}
        defaultValue={classData?.duration}
        rules={{
          required: '진행시간',
          max: { value: 999, message: '올바른 진행시간' },
          min: { value: 10, message: '올바른 진행시간' },
        }}
        render={({ field }) => (
          <Section
            Isfixed={true}
            title=" 하나의 클래스당 진행시간이 어떻게 되나요?"
            error={!!errors.duration?.message}
            id={field.name}
          >
            <div className="flex items-center">
              <input
                type="number"
                min={30}
                value={classTime || ''}
                onChange={(e) => {
                  setClassTime(Number(e.target.value));
                  field.onChange(Number(e.target.value));
                }}
                className="h-7 w-12 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.81rem] py-1"
              />
              <span className="ml-[0.38rem] text-sm font-bold text-sub-color3">
                분
              </span>
            </div>
          </Section>
        )}
      />

      {/* 운영시간 */}
      {/* to은서:  name, defaultValue 아래 주석 확인 바람*/}
      <Controller
        name="임시 저장될 데이터이름"
        control={control}
        defaultValue="classData에 넣는 이름"
        rules={{
          required: '운영 요일',
        }}
        render={({ field }) => (
          // field.onChang로 보낼 데이터 바뀌는 곳 넣기
          // field.value로 임시저장 불러와지는 곳에 넣기
          <Section
            Isfixed={true}
            title="클래스 운영 요일을 알려주세요"
            error={false}
            id={field.name}
            // !!errors.임시 저장될 데이터이름?.message 넣기
          >
            <ClassDay />
          </Section>
        )}
      />

      <Controller
        name="holidays"
        control={control}
        defaultValue={classData?.holidays}
        rules={{
          required: '휴무일',
        }}
        render={({ field }) => (
          <Section
            title="휴무일이 있나요?"
            id={field.name}
            error={!!errors.holidays?.message}
          >
            <DayOff onChange={field.onChange} defaultValue={field.value} />
          </Section>
        )}
      />

      <Controller
        name="reservationDeadline"
        control={control}
        defaultValue={classData?.reservationDeadline}
        rules={{
          required: '신청 마감 시간',
          min: { value: 0, message: '올바른 마감 시간' },
        }}
        render={({ field }) => (
          <Section
            title="신청 마감 시간을 설정해주세요"
            error={!!errors.reservationDeadline?.message}
            id={field.name}
          >
            <div className="ml-[0.38rem] text-sm font-medium text-sub-color3">
              <span>수업 시작</span>
              <input
                type="number"
                value={deadline || ''}
                onChange={(e) => {
                  setDeadline(Number(e.target.value));
                  field.onChange(Number(e.target.value));
                }}
                className="ml-[1.38rem] mr-[0.38rem] h-8 w-12 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.81rem] py-1"
              />
              <span>시간 전</span>
            </div>
          </Section>
        )}
      />

      <Section
        title="추가된 클래스를 확인해보세요"
        IsAddedClass={true}
        classNum={classNum}
      >
        <div className="max-w-[37.4rem]">
          {/* 추가된 클래스  lectureSchedule 데이터 가공 구현 예정 */}
          {classDates && (
            <ScheduleView
              clickableDates={classDates}
              lectureSchedule={lectureSchedule}
            />
          )}
        </div>
      </Section>

      <Section title="예약시 유의사항">
        <textarea
          defaultValue={classData?.reservationComment}
          {...register('reservationComment')}
          placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다. \n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
          className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-[0.31rem] border border-solid border-sub-color4 p-[0.62rem]"
        />
      </Section>
    </>
  );
};

export default ClassSchedule;

interface ISection {
  Isfixed?: boolean;
  IsAddedClass?: boolean;
  classNum?: number;
  title: string;
  children: React.ReactNode;
  error?: boolean;
  id?: string;
}

const Section = ({
  Isfixed = false,
  IsAddedClass = false,
  classNum,
  title,
  children,
  error,
  id,
}: ISection) => {
  return (
    <section
      id={id}
      className="max-w-[675px] border-b border-solid border-sub-color4 py-6"
    >
      <h2 className="mb-4 flex items-center text-lg font-bold">
        <p className={`${error && 'animate-vibration text-main-color'}`}>
          {title}
        </p>
        {IsAddedClass && classNum && classNum > 0 ? ` (${classNum}개)` : null}
        {Isfixed && (
          <span className="ml-2 flex flex-col text-sm font-bold text-main-color">
            *등록 후 수정 불가
          </span>
        )}
      </h2>
      {children}
    </section>
  );
};

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useClassScheduleStore } from '@/store';
import {
  formatDateWithHyphens,
  parseHyphenatedDate,
} from '@/utils/dateTimeUtils';
import ClassDay from './ClassSchedule/ClassDay/ClassDay';
import ClassRange from './ClassSchedule/ClassRange/ClassRange';
import DayOff from './ClassSchedule/DayOff/DayOff';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import { DayTimeList, DateTimeList, IprocessedDraft } from '@/types/class';

const ClassSchedule = ({
  classData,
}: {
  classData: IprocessedDraft | null;
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const duration = watch('duration') || classData?.duration;
  const lectureMethod = watch('lectureMethod') || classData?.lectureMethod;
  const setClassDuration = useClassScheduleStore(
    (state) => state.setClassDuration,
  );
  const classDates = useClassScheduleStore((state) => state.filteredDates);
  const classNum = classDates?.length;
  const maxCapacitity = watch('max')?.value || classData?.max;
  const filteredDates = useClassScheduleStore((state) => state.filteredDates);

  useEffect(() => {
    setClassDuration(duration);
  }, [duration]);

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
        defaultValue={classData?.duration || ''}
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
                value={field.value}
                onChange={(e) => {
                  setClassDuration(Number(e.target.value));
                  field.onChange(Number(e.target.value));
                }}
                className="h-7 w-12 rounded-md border border-solid border-gray-500 px-[0.81rem] py-1 focus:outline-sub-color1"
              />
              <span className="ml-[0.38rem] text-sm font-bold text-gray-100">
                분
              </span>
            </div>
          </Section>
        )}
      />

      {/* 운영시간 */}
      <Controller
        name="schedules"
        control={control}
        defaultValue={classData?.schedules}
        rules={{
          required: '운영 일정',
          validate: (schedules) => {
            return schedules?.every((schedule: DayTimeList | DateTimeList) => {
              if ('day' in schedule) {
                return schedule.day && schedule.startDateTime;
              } else if ('date' in schedule) {
                return schedule.date && schedule.startDateTime;
              }
              return false;
            });
          },
        }}
        render={({ field }) => (
          <Section
            Isfixed={true}
            title="클래스 운영 일정을 알려주세요"
            error={!!errors.schedules?.message}
            id={field.name}
          >
            <ClassDay
              defaultValue={field.value}
              onChange={field.onChange}
              lectureMethod={lectureMethod}
              duration={duration}
            />
          </Section>
        )}
      />

      <Controller
        name="holidays"
        control={control}
        defaultValue={classData?.holidays}
        render={({ field }) => (
          <Section title="휴무일이 있나요?" id={field.name}>
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
          min: { value: 1, message: '올바른 마감 시간' },
        }}
        render={({ field }) => (
          <Section
            title="신청 마감 시간을 설정해주세요"
            error={!!errors.reservationDeadline?.message}
            id={field.name}
          >
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
          </Section>
        )}
      />

      <Section
        title="추가된 클래스를 확인해보세요"
        IsAddedClass={true}
        classNum={classNum}
      >
        <div className="max-w-[37.4rem]">
          {classDates && (
            <ScheduleView
              maxCapacity={maxCapacitity}
              duration={duration}
              lectureSchedule={filteredDates || []}
            />
          )}
        </div>
      </Section>

      <Section title="예약시 유의사항">
        <textarea
          defaultValue={classData?.reservationComment}
          {...register('reservationComment')}
          placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다. \n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
          className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-700 p-[0.62rem]"
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
      className="max-w-[675px] border-b border-solid border-gray-700 py-6"
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

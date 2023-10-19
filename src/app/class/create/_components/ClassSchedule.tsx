import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dummyClass } from '@/constants/dummy';
import { classTimeState, classDatesState } from '@/recoil/ClassSchedule/atoms';
import ClassDay from './ClassSchedule/ClassDay/ClassDay';
import ClassRange from './ClassSchedule/ClassRange/ClassRange';
import DayOff from './ClassSchedule/DayOff/DayOff';
import ScheduleView from '@/components/ScheduleView/ScheduleView';

const ClassSchedule = () => {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [classNotification, setClassNotification] = useState('');
  const [classTime, setClassTime] = useRecoilState(classTimeState);
  const classDates = useRecoilValue(classDatesState);
  const classNum = classDates?.length;
  const { lectureSchedule } = dummyClass;
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClassNotification(event.target.value);
  };

  return (
    <>
      <Section title="전체 클래스 기간을 설정해주세요">
        <ClassRange />
      </Section>

      {/* 진행시간 */}
      <Section
        Isfixed={true}
        title=" 하나의 클래스당 진행시간이 어떻게 되나요?"
      >
        <div className="flex items-center">
          <input
            type="number"
            min={30}
            value={classTime || ''}
            onChange={(e) => setClassTime(Number(e.target.value))}
            className="h-7 w-12 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.81rem] py-1"
          />
          <span className="ml-[0.38rem] text-sm font-bold text-sub-color3">
            분
          </span>
        </div>
      </Section>

      {/* 운영시간 */}
      <Section Isfixed={true} title="클래스 운영 요일을 알려주세요">
        <ClassDay />
      </Section>

      <Section title="휴무일이 있나요?">
        <DayOff />
      </Section>

      <Section title="신청 마감 시간을 설정해주세요">
        <div className="ml-[0.38rem] text-sm font-medium text-sub-color3">
          <span>수업 시작</span>
          <input
            type="number"
            value={deadline || ''}
            onChange={(e) => setDeadline(Number(e.target.value))}
            className="ml-[1.38rem] mr-[0.38rem] h-8 w-12 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.81rem] py-1"
          />
          <span>시간 전</span>
        </div>
      </Section>

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
          value={classNotification}
          onChange={handleTextareaChange}
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
}

const Section = ({
  Isfixed = false,
  IsAddedClass = false,
  classNum,
  title,
  children,
}: ISection) => {
  return (
    <section className="max-w-[675px] border-b border-solid border-sub-color4 py-6">
      <h2 className="mb-4 flex items-center text-lg font-bold">
        {title}
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

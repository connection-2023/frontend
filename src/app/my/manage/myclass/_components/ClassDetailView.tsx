import { useState } from 'react';
import { ArrowUpSVG, EditSVG, ArrowRightSVG } from '@/icons/svg';
import ClassOverview from './detail/ClassOverview';
import ClassTable from './detail/ClassTable';
import EditDayOff from './detail/EditDayOff';
import Notice from '@/components/ClassNotice/Notice';

const ClassDetailView = ({ onGoBack }: { onGoBack: () => void }) => {
  // --- ClassListView에서 제목과 같은 데이터를 넘겨 받을지 서버에서 받을지 고민 ---

  return (
    <section className="flex max-w-[60rem] flex-col justify-between">
      {/* Top Section */}
      <section className="flex whitespace-nowrap border-b border-solid border-sub-color4 py-3">
        <div className="flex w-full items-center">
          <button onClick={onGoBack} className="origin-center -rotate-90">
            <ArrowUpSVG fill="black" />
          </button>
          <p className="mr-2 flex h-[1.5625rem] w-[3.5625rem] items-center justify-center border-2 border-solid border-sub-color2 text-sm font-bold text-sub-color3">
            모집중
          </p>
          <h1 className="text-base font-bold text-black">
            &quot;원밀리언 댄스 스튜디오 with리아킴&quot; 에게 배우는 댄스 입문
          </h1>
        </div>
        <button className="flex h-[2.125rem] w-[7.5625rem] items-center justify-center gap-[0.44rem] rounded-[0.3125rem] bg-sub-color1 text-sm font-semibold text-white">
          <EditSVG width="16" height="16" fill="white" /> 클래스 수정
        </button>
      </section>
      <div className="mt-3 flex w-full gap-4">
        <section className="flex w-full max-w-[40rem] flex-col">
          <AccordionSection title="휴무일" component={<EditDayOff />} />
          <AccordionSection
            title="예약 시 유의사항"
            component={
              <textarea
                // --- 공통 컴포넌트로 변경 예정 ---
                placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다.\n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
                className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-[0.31rem] border border-solid border-sub-color4 px-[0.69rem] py-[0.62rem] text-xs"
              />
            }
          />
          <div className="mt-4">
            <Notice
              content="공지사항 컴포넌트 로그인 권한 확인 후에 수정 예정~!"
              updateDate="2023.10.27"
            />
          </div>
          <div className="mt-5">
            <ClassTable />
          </div>
        </section>
        <ClassOverview />
      </div>
    </section>
  );
};

export default ClassDetailView;

interface IAccordionSection {
  title: string;
  component: React.ReactNode;
}

const AccordionSection = ({ title, component }: IAccordionSection) => {
  const [isExpanded, setIsExpended] = useState(false);
  const buttonStyle = isExpanded
    ? 'origin-center -rotate-90'
    : 'origin-center rotate-90';

  return (
    <section className="min-h-[2.37rem] border-b border-solid border-sub-color4 pt-[0.87rem]">
      <h2
        onClick={() => setIsExpended(!isExpanded)}
        className="mb-2 flex cursor-pointer items-center text-sub-color3"
      >
        {title}
        <button className={`ml-2 ${buttonStyle}`}>
          <ArrowRightSVG className="stroke-sub-color3" />
        </button>
      </h2>

      {isExpanded && component}
    </section>
  );
};

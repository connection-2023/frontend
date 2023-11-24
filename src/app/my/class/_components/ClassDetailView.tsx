import Link from 'next/link';
import { ButtonStyles } from '@/constants/constants';
import { ArrowUpSVG, ChatSVG } from '@/icons/svg';
import UniqueButton from '@/components/Button/UniqueButton';
import Notice from '@/components/ClassNotice/Notice';
import ProfileImage from '@/components/ProfileImage/ProfileImage';

const timeTable = [
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
];

const ClassDetailView = ({ onGoBack }: { onGoBack: () => void }) => {
  return (
    <section className="mb-18 col-span-2 flex h-full max-w-[60rem] flex-col rounded-lg text-sm">
      <section className="flex items-center whitespace-nowrap border-b border-solid border-gray-500 px-2 py-3">
        <div className="flex w-full ">
          <button onClick={onGoBack} className="origin-center -rotate-90">
            <ArrowUpSVG width="34" height="34" fill="black" />
          </button>
          <p className="text-2xl font-bold">
            (A반) 가비쌤과 함께하는 왁킹 클래스
          </p>
        </div>
        <div className="flex w-fit gap-2">
          <div className="w-[4.69rem]">
            <Link
              href="/"
              className={`h-7 font-semibold ${ButtonStyles.default}`}
            >
              커리큘럼
            </Link>
          </div>
          <div className="w-[4.69rem]">
            <UniqueButton size="small" color="secondary">
              수강취소
            </UniqueButton>
          </div>
        </div>
      </section>

      <div className="mb-4 mt-3">
        <Notice
          content="공지사항 컴포넌트 로그인 권한 확인 후에 수정 예정~!"
          updateDate="2023.10.27"
        />
      </div>

      <div className="grid min-h-[20.5rem] grid-cols-2 gap-x-4">
        <section className="rounded-md bg-white p-4 shadow-float">
          <div className="grid grid-cols-[max-content_1fr] gap-x-3.5 gap-y-2.5 border-b border-solid border-gray-700 pb-3.5 font-semibold">
            <p>강사</p>
            <div className="flex items-center gap-2 font-medium underline underline-offset-2">
              <ProfileImage size="xsmall" src={null} label={false} />
              가비쌤
              <ChatSVG className="cursor-pointer fill-black stroke-black" />
            </div>
            <p>진행장소</p>
            <p className="font-normal">서울특별시 성동구 뚝섬로13길 33</p>
            <p>신청 횟수</p> <p className="font-normal">5회</p>
            <p>결제정보</p>
            <div className="flex flex-col gap-1.5">
              <p className="font-normal font-semibold text-gray-100">
                50,000원<span className="ml-2 text-gray-500">카드결제</span>
              </p>
              <p className="font-medium text-gray-500">
                51,000 - (1000원 쿠폰할인)
              </p>
            </div>
          </div>
          <div className="mt-3.5 flex flex-col gap-2 font-semibold">
            <p>요청사항</p>
            <textarea
              value="(요청사항 없음)"
              disabled
              className="min-h-[6.5rem] w-full resize-none rounded-md border border-solid bg-white p-2 font-normal text-gray-500"
            />
          </div>
        </section>

        <section className="flex min-h-[20.5rem] rounded-md bg-white shadow-float">
          <table className="h-fit w-full font-medium">
            <thead className="w-full border-b border-solid border-gray-700">
              <tr className="h-[2.3rem] w-full text-left font-semibold">
                <th className="pl-4">수업날짜</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {timeTable.map((table, index) => (
                <tr
                  key={table.date + index}
                  className="h-[2.2rem] w-full border-b border-solid border-gray-700"
                >
                  <td className="pl-4">{table.date}</td>
                  <td>{table.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
};

export default ClassDetailView;

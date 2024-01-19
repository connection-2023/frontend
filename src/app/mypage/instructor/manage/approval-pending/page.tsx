'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPendingList } from '@/lib/apis/instructorApi';
import ClassList from './_components/ClassList';
import Loading from './_components/Loading';
import EmptyApprovalList from './_components/EmptyApprovalList';

const ApprovalPendingPage = () => {
  const [selectedClass, setSelectedClass] = useState<string>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['pendingList'],
    queryFn: getPendingList,
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) return <Loading />;

  if (error || data instanceof Error || !data) return console.log('error'); // 추후 에러 페이지 처리 예정

  return (
    <section className="mx-4 h-full rounded-lg bg-white shadow-float md:mx-9 md:p-6 xl:mx-0">
      <div className="mb-4 flex flex-col gap-x-4 gap-y-3.5 px-3.5 pt-6 md:flex-row md:p-0">
        <h1 className="text-2xl font-bold">승인대기({data.length})</h1>
        <select
          name="selectedClass"
          className="h-7 h-8 w-80 border border-solid border-gray-500"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          aria-label="클래스 선택"
        >
          <option value="" className="text-sm text-gray-300">
            클래스 선택
          </option>
        </select>
      </div>

      <p className="whitespace-pre-line break-keep px-3.5 text-base md:p-0">
        *노쇼위약금 혹은 신청금액의 입금이 확인된 수강생에 한하여 하단의
        신청승인 버튼을 클릭하셔야 해당 수강생의 수강 신청이 완료됩니다. <br />{' '}
        <span className="text-main-color">
          수락 전 노쇼위약금/신청금액 입금이 완료되었는지 확인해주세요.
        </span>
      </p>

      {data && data.length ? (
        <div className="mt-5 flex flex-col gap-4">
          {data.map((classItem) => (
            <ClassList key={classItem.lecture.id} classItem={classItem} />
          ))}
        </div>
      ) : (
        <EmptyApprovalList />
      )}
    </section>
  );
};

export default ApprovalPendingPage;

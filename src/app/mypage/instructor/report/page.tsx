'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { getInstructorReport } from '@/lib/apis/reportApis';

const ReportList = dynamic(() => import('./_components/ReportList'), {
  ssr: false,
});

const ReportHistoryPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['instructor', 'report'],
    queryFn: () => getInstructorReport(100, 0, 0, 0, 0, 'ALL'),
  });

  if (!data || error) return null;

  return (
    <section className="mx-4 box-border flex flex-col rounded-lg bg-white px-3.5 py-5 text-sm text-gray-100 md:mx-9 md:px-5">
      <h1 className="mb-[1.81rem] text-2xl font-bold">신고내역</h1>

      <table className="w-full max-w-[40rem] border-collapse px-4 py-2">
        <thead>
          <tr className="flex items-center gap-4 border-y border-solid border-black px-4 py-2 text-left font-semibold md:gap-10">
            <th className="w-20 md:w-24">신고대상</th>
            <th className="w-32 flex-1 md:w-36">신고사유</th>
            <th className="w-12 whitespace-nowrap">상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <ReportList key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ReportHistoryPage;

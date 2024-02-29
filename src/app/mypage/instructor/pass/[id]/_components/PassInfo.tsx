'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRightSVG } from '@/icons/svg';
import { getPassForId } from '@/lib/apis/passApis';
import { usePassSelectStore } from '@/store/passSelectStore';
import Button from '@/components/Button/Button';
import InstructorPass from '@/components/Pass/InstructorPass';

interface PassInfoProps {
  id: number;
}

const PassInfo = ({ id }: PassInfoProps) => {
  const { passInfo } = usePassSelectStore((state) => ({
    passInfo: state.passInfo,
  }));

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['instructor', 'pass'],
    queryFn: async () => {
      if (!passInfo) {
        try {
          return await getPassForId(id);
        } catch (error) {
          console.error(error);
          router.push('/mypage/instructor/pass');
        }
      }

      return passInfo;
    },
  });

  if (isLoading || !data) {
    return <div className="h-96 w-full animate-pulse bg-gray-700" />; //추후 변경
  }

  return (
    <>
      <header className="mb-4 flex items-center justify-between border-b border-solid border-gray-700 p-5">
        <div className="flex text-2xl font-bold">
          <button onClick={() => window.history.back()}>
            <ArrowRightSVG className="h-8 w-8 rotate-180 stroke-black " />
          </button>
          패스권 현황
        </div>
        <div className="w-28">
          <Button color="secondary" size="small">
            판매 중지
          </Button>
        </div>
      </header>

      <div className="flex flex-col-reverse items-center gap-5 px-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 sm:py-2">
        <dl className="grid flex-grow grid-cols-[1fr,5fr] gap-x-6 gap-y-2 truncate text-sm sm:gap-x-11">
          <dt className="font-semibold text-gray-300">패스권 명칭</dt>
          <dd className="truncate">{data.title}</dd>
          <dt className="font-semibold text-gray-300">적용된 클래스</dt>
          <dd>
            <ul className="flex flex-col">
              {data.lecturePassTarget.map(({ lecture }) => (
                <li key={lecture.id} className="group">
                  <Link
                    href={`/class/${lecture.id}`}
                    className="group-hover:text-sub-color1"
                  >
                    {lecture.title}
                  </Link>
                </li>
              ))}
            </ul>
          </dd>
          <dt className="font-semibold text-gray-300">사용가능 기간</dt>
          <dd>{data.availableMonths}개월</dd>
          <dt className="font-semibold text-gray-300">횟수</dt>
          <dd>{data.maxUsageCount}회</dd>
          <dt className="font-semibold text-gray-300">판매 가격</dt>
          <dd>{data.price.toLocaleString()}원</dd>
        </dl>

        <div className="h-fit">
          <InstructorPass passInfo={data} />
        </div>
      </div>
    </>
  );
};

export default PassInfo;

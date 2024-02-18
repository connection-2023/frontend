import { redirect } from 'next/navigation';
import { ArrowRightSVG } from '@/icons/svg';
import {
  getMyMember,
  getMyMemberPasses,
} from '@/lib/apis/serverApis/instructorPostApis';
import ClassApplied from './_components/ClassApplied';
import Member from './_components/Member';
import PassesView from './_components/PassesView';
import { GetMyMemberData, GetMyMemberPassesData } from '@/types/instructor';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let memberInfo: GetMyMemberData[] = [];
  let passes: GetMyMemberPassesData[] = [];

  try {
    const [resMember, resMemberPasses] = await Promise.all([
      getMyMember(id),
      getMyMemberPasses(id),
    ]);

    if (resMember.length === 0) {
      throw new Error('접근 권한 없음');
    }

    memberInfo = resMember.filter((data) => data.reservation); // 백엔드 데이터 정리 후 추후 제거
    // memberInfo = resMember
    passes = resMemberPasses;
  } catch (error) {
    console.error(error);
    redirect('/mypage/instructor/manage/member');
  }

  return (
    <main className="col-span-1 flex w-full flex-col px-2 sm:px-6">
      <section className="flex flex-col gap-6 bg-white px-5 pb-5 pt-6 sm:rounded-t-md sm:shadow-[0_-1px_5px_0px_rgba(0,0,0,0.25)]">
        <header className="flex items-center gap-2">
          <button>
            <ArrowRightSVG className="h-8 w-8 rotate-180 stroke-gray-100 " />
          </button>
          <h1 className="text-2xl font-bold text-gray-100">회원 관리</h1>
        </header>
        <Member />
        <PassesView passes={passes} />
      </section>

      <div className="bg-white pb-8 shadow-[0_4px_5px_0_rgba(0,0,0,0.25)] sm:px-6">
        <h2 className="mb-3 text-lg font-bold">
          신청한 클래스 ({memberInfo.length})
        </h2>
        <ul className="flex flex-col gap-3">
          {memberInfo.map((info) => (
            <ClassApplied key={info.id} member={info} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default page;

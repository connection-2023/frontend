import { redirect } from 'next/navigation';
import { ArrowRightSVG } from '@/icons/svg';
import {
  getMyMember,
  getMyMemberPasses,
} from '@/lib/apis/serverApis/instructorPostApis';
import Member from './_components/Member';
import PassesView from './_components/PassesView';
import { GetMyMemberData, GetMyMemberPassesData } from '@/types/instructor';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let member: GetMyMemberData[] = [];
  let passes: GetMyMemberPassesData[] = [];

  try {
    const [resMember, resMemberPasses] = await Promise.all([
      getMyMember(id),
      getMyMemberPasses(id),
    ]);

    if (resMember.length === 0) {
      throw new Error('접근 권한 없음');
    }

    member = resMember;
    passes = resMemberPasses;
  } catch (error) {
    console.error(error);
    redirect('/mypage/instructor/manage/member');
  }

  return (
    <main className="col-span-1 flex w-full flex-col px-2 sm:px-6">
      <section className="flex flex-col gap-6 rounded-md bg-white px-5 pb-10 pt-6 shadow-horizontal">
        <header className="flex items-center gap-2">
          <button>
            <ArrowRightSVG className="h-8 w-8 rotate-180 stroke-gray-100 " />
          </button>
          <h1 className="text-2xl font-bold text-gray-100">회원 관리</h1>
        </header>
        <Member />
        <PassesView passes={passes} />
      </section>
    </main>
  );
};

export default page;

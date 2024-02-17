import {
  getMyMember,
  getMyMemberPasses,
} from '@/lib/apis/serverApis/instructorPostApis';
import { GetMyMemberData, GetMyMemberPassesData } from '@/types/instructor';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let member: GetMyMemberData[] = [];
  let passes: GetMyMemberPassesData[] = [];

  try {
    const [resMember, resMemberPasses] = await Promise.all([
      getMyMember(id),
      getMyMemberPasses(id),
    ]);

    member = resMember;
    passes = resMemberPasses;
    console.log(member);
    console.log(passes);
  } catch (error) {
    console.error(error);
  }

  return <div />;
};

export default page;

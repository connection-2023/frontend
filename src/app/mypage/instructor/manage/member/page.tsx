import { MEMBER_MANAGE_TAKE } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getMyMembers } from '@/lib/apis/serverApis/instructorPostApis';
import MemberManage from './_components/MemberManage';
import { OptionType } from '@/types/coupon';
import { GetMyMembersData } from '@/types/instructor';

const page = async () => {
  let myClassListsOption: OptionType[] = [];
  let myMembers: GetMyMembersData = {
    count: 0,
    item: [],
  };

  const firstRender = {
    take: MEMBER_MANAGE_TAKE,
    sortOption: 'LATEST' as 'LATEST',
    filterOption: 'ALL' as 'ALL',
  };

  try {
    const [resMyMembers, resLectureLists] = await Promise.all([
      getMyMembers(firstRender),
      getMyLecture(),
    ]);

    myMembers = resMyMembers;

    myClassListsOption = resLectureLists.map(
      ({ id, title }): OptionType => ({
        value: id,
        label: title,
      }),
    );

    myClassListsOption.length > 0 &&
      myClassListsOption.unshift({
        value: '',
        label: `전체 클래스(${myClassListsOption.length})`,
      });
  } catch (error) {
    console.error(error);
  }

  return (
    <MemberManage
      myMembers={myMembers}
      myClassListsOption={myClassListsOption}
    />
  );
};

export default page;

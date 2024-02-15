import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getMyMembers } from '@/lib/apis/serverApis/instructorPostApis';
import { OptionType } from '@/types/coupon';
import { GetMyMembersData } from '@/types/instructor';

const page = async () => {
  let myClassListsOption: OptionType[] = [];
  let myMembers: GetMyMembersData;

  const firstRender = {
    take: 1, //10
    sortOption: 'LATEST' as 'LATEST',
    filterOption: 'ALL' as 'ALL',
  };

  try {
    const [resMyMembers, resLectureLists] = await Promise.all([
      getMyMembers(firstRender),
      getMyLecture(),
    ]);

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

  return <div />;
};

export default page;

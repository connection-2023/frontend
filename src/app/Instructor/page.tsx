import BestInstructors from '@/app/instructor/_components/BestInstructors';
import { INSTRUCTOR_TAKE } from '@/constants/constants';
import { dummyMain } from '@/constants/dummy';
import { searchInstructors } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformSearchInstructor } from '@/utils/apiDataProcessor';
import InstructorListView from './_components/InstructorListView';
import { InstructorCardProps, SearchParams } from '@/types/types';

const instructorPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { authUser } = useUserStore.getState();

  let instructorList: InstructorCardProps[] = [];

  const searchData = {
    take: INSTRUCTOR_TAKE,
    sortOption: searchParams.sortOption ?? 'LATEST',
    value: searchParams.query,
    genres: searchParams.genres,
    regions: searchParams.regions,
    stars: searchParams.stars,
  };

  try {
    const instructors = await searchInstructors(searchData, !!authUser);

    instructorList = transformSearchInstructor(instructors);

    for (let i = 0; i < 11; i++) {
      instructorList.push(instructorList[0]);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col">
      <BestInstructors list={dummyMain.topInstructorList} />

      <InstructorListView instructorList={instructorList} />
    </section>
  );
};

export default instructorPage;

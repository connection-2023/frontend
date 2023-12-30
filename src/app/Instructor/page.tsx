import BestInstructors from '@/app/instructor/_components/BestInstructors';
import { INSTRUCTOR_TAKE } from '@/constants/constants';
import { dummyMain } from '@/constants/dummy';
import { searchInstructors } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformSearchInstructor } from '@/utils/apiDataProcessor';
import InstructorListView from './_components/InstructorListView';
import { Instructors } from '@/types/types';

const instructorPage = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    sortOption?: 'LATEST' | 'STARS';
    genres?: string[];
    regions?: string[];
    stars?: number;
  };
}) => {
  const { authUser } = useUserStore.getState();

  let instructorList: Instructors[] = [];

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
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col">
      <BestInstructors list={dummyMain.topInstructorList} />

      <InstructorListView />
    </section>
  );
};

export default instructorPage;

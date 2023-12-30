import Link from 'next/link';
import BestInstructors from '@/app/instructor/_components/BestInstructors';
import { INSTRUCTOR_TAKE } from '@/constants/constants';
import { dummyMain } from '@/constants/dummy';
import { searchInstructors } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import InstructorListView from './_components/InstructorListView';
import { searchInstructor } from '@/types/instructor';

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

  let instructorList: searchInstructor[] = [];

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

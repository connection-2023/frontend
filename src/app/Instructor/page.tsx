import BestInstructors from '@/app/instructor/_components/BestInstructors';
import { INSTRUCTOR_TAKE } from '@/constants/constants';
import { dummyMain } from '@/constants/dummy';
import { searchInstructors } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import {
  transformSearchInstructor,
  transformSearchParamsLocation,
} from '@/utils/apiDataProcessor';
import InstructorListView from './_components/InstructorListView';
import Filters from '@/components/Filter/Filters';
import {
  IFilterOptions,
  InstructorCardProps,
  SearchParams,
} from '@/types/types';

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
    regions: searchParams.regions
      ? Array.isArray(searchParams.regions)
        ? searchParams.regions
        : [searchParams.regions]
      : undefined,
    stars: searchParams.stars,
  };

  const filterOptions: IFilterOptions = {
    location: transformSearchParamsLocation(searchData.regions ?? []),
    genre: [],
    review: 0,
    price: [],
    date: [],
    method: [],
    daytime: [],
  };

  try {
    const instructors = await searchInstructors(searchData, !!authUser);

    instructorList = transformSearchInstructor(instructors);

    if (searchParams.sortOption === 'STARS') {
      for (let i = 0; i < 11; i++) {
        instructorList.push(instructorList[0]);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col">
      <BestInstructors list={dummyMain.topInstructorList} />

      <InstructorListView
        instructorList={instructorList}
        searchData={searchData}
      >
        <Filters type="instructor" filterOption={filterOptions} />
      </InstructorListView>
    </section>
  );
};

export default instructorPage;
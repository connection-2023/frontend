import { redirect } from 'next/navigation';
import BestInstructors from '@/app/instructor/_components/BestInstructors';
import {
  DANCE_GENRE,
  INSTRUCTOR_TAKE,
  REGIONS_SELECT_MAX,
} from '@/constants/constants';
import { dummyMain } from '@/constants/dummy';
import { searchInstructors } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import {
  transformSearchInstructor,
  transformSearchParamsLocation,
} from '@/utils/apiDataProcessor';
import { regionsDecryption } from '@/utils/searchFilterFn';
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
    genres: [...new Set(searchParams.genre ?? [])].filter((genre) =>
      DANCE_GENRE.includes(genre),
    ),
    regions: [...new Set(regionsDecryption(searchParams.regions))].slice(
      0,
      REGIONS_SELECT_MAX,
    ),
    stars: searchParams.stars ?? 0,
  };

  const filterOptions: IFilterOptions = {
    regions: transformSearchParamsLocation(searchData.regions),
    genre: searchData.genres,
    review: searchData.stars,
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
    } // 삭제 (테스트용)
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

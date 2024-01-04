import { format, parseISO } from 'date-fns';
import { CITY_ABBREVIATION_NAME } from '@/constants/administrativeDistrict';
import { searchAll } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import {
  transformSearchClass,
  transformSearchInstructor,
} from '@/utils/apiDataProcessor';
import ListSection from './results/ListSection';
import ResultInput from '../../../components/SearchInput/SearchInput';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { ClassCardType } from '@/types/class';
import { InstructorCardProps, SearchParams } from '@/types/types';

const Results = async ({ searchParams }: { searchParams: SearchParams }) => {
  const userStoreState = useUserStore.getState();
  let instructorList: InstructorCardProps[] = [];
  let classList: ClassCardType[] = [];
  const query = searchParams.query ?? '';

  try {
    const { searchedLecturers, searchedLectures } = await searchAll(
      query,
      8,
      !!userStoreState.authUser,
    );

    instructorList = transformSearchInstructor(searchedLecturers).slice(0, 4);

    classList = transformSearchClass(searchedLectures);
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-9 px-4 py-4 lg:px-9 xl:px-16">
      <ResultInput query={query} />

      <ListSection
        title="강사"
        link="/instructor"
        hasResults={instructorList.length > 0}
        searchParams={searchParams}
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-4">
          {instructorList.map((info) => (
            <div key={info.id} className="h-60">
              <InstructorCard {...info} />
            </div>
          ))}
        </div>
      </ListSection>

      <ListSection
        title="클래스"
        link="/class"
        hasResults={classList.length > 0}
        searchParams={searchParams}
      >
        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-9 md:grid-cols-3 lg:gap-x-4 xl:grid-cols-2 xl:gap-5">
          {classList.map((info) => (
            <ClassPreview key={info.id} {...info} />
          ))}
        </div>
      </ListSection>
    </section>
  );
};

export default Results;

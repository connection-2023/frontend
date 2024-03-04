import { cookies } from 'next/headers';
import { searchAll } from '@/lib/apis/serverApis/searchApis';
import {
  transformSearchClass,
  transformSearchInstructor,
  transformSearchPasses,
} from '@/utils/apiDataProcessor';
import ListSection from './results/ListSection';
import ResultInput from '../../../components/SearchInput/SearchInput';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import UserPass from '@/components/Pass/UserPass';
import { ClassCardType } from '@/types/class';
import { searchPass, userPass } from '@/types/pass';
import { InstructorCardProps, SearchParams } from '@/types/types';

const Results = async ({ searchParams }: { searchParams: SearchParams }) => {
  const cookieStore = cookies();
  const user = cookieStore.get('userAccessToken')?.value;
  let instructorList: InstructorCardProps[] = [];
  let classList: ClassCardType[] = [];
  let passesList: userPass[] = [];
  const query = searchParams.query ?? '';

  try {
    const { searchedLecturers, searchedLectures, searchedPasses } =
      await searchAll(query, 8, !!user);

    instructorList = transformSearchInstructor(searchedLecturers).slice(0, 4);

    classList = transformSearchClass(searchedLectures);

    passesList = transformSearchPasses(searchedPasses).slice(0, 4);
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

      <ListSection
        title="패스권"
        link="/pass"
        hasResults={true}
        searchParams={searchParams}
      >
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
          {passesList.map((passInfo) => (
            <UserPass key={passInfo.id} passInfo={passInfo} />
          ))}
        </div>
      </ListSection>
    </section>
  );
};

export default Results;

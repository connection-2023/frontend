import Link from 'next/link';
import { CITY_ABBREVIATION_NAME } from '@/constants/administrativeDistrict';
import { SearchSVG } from '@/icons/svg';
import { searchAll } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { ClassCardType } from '@/types/class';
import { InstructorCardProps } from '@/types/types';

const Results = async ({ query }: { query: string }) => {
  const userStoreState = useUserStore.getState();
  let instructorList: InstructorCardProps[] = [];
  let classList: ClassCardType[] = [];
  try {
    const { searchedLecturers, searchedLectures } = await searchAll(
      query,
      8,
      !!userStoreState.authUser,
    );

    instructorList = searchedLecturers
      .map(
        ({
          id,
          nickname,
          regions,
          genres,
          lecturerImages,
          stars,
          affiliation,
          isLiked,
        }) => ({
          id,
          isLiked,
          largeImg: false,
          name: nickname,
          teamAffiliation: affiliation,
          address: regions.map(
            ({ administrativeDistrict, district }) =>
              `${CITY_ABBREVIATION_NAME[administrativeDistrict]} ${district}`,
          ),
          genres: genres.map(({ genre }) => genre),
          imgURL: lecturerImages,
          average: stars,
          href: `instructor/${id}`,
        }),
      )
      .slice(0, 4);

    // classList = searchedLectures.map(({ id, title }) => ({
    //   id,
    //   title,
    // }));
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-9 px-4 py-4 lg:px-9 xl:px-16">
      <div className="relative">
        <input className="h-12 w-full rounded-xl p-4 text-lg shadow-vertical focus:shadow-sub-color1 focus:outline-none" />
        <button>
          <SearchSVG className="absolute right-4 top-1/2 h-[1.8rem] w-[1.8rem] -translate-y-1/2 transform fill-black" />
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <h2>강사</h2>
          <Link href="/" className="underline">
            강사 더보기
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-4">
          {instructorList.map((info) => (
            <div key={info.id} className="h-60">
              <InstructorCard {...info} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <h2>클래스</h2>
          <Link href="/" className="underline">
            클래스 더보기
          </Link>
        </div>
        <div className="grid grid-cols-4" />
      </div>
    </section>
  );
};

export default Results;

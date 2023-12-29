import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { CITY_ABBREVIATION_NAME } from '@/constants/administrativeDistrict';
import { SearchSVG } from '@/icons/svg';
import { searchAll } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
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

    classList = searchedLectures.map(
      ({
        id,
        title,
        startDate,
        endDate,
        lectureImages,
        regions,
        genres,
        reviewCount,
        lectureMethod, // 원데이, 정기 표시 안하나?
        isGroup,
        stars,
        price,
        lecturer,
      }) => ({
        id,
        title,
        date: `${format(parseISO(startDate), 'MM/dd')}~${format(
          parseISO(endDate),
          'MM/dd',
        )} `,
        status: '모집중', //수정 예정
        imgURL: lectureImages,
        location: regions.map(
          ({ administrativeDistrict, district }) =>
            `${CITY_ABBREVIATION_NAME[administrativeDistrict]} ${district}`,
        ),
        genre: genres.map(({ genre }) => genre),
        type: isGroup ? '그룹레슨' : '개인레슨' + ' ' + lectureMethod,
        review: { average: stars, count: reviewCount },
        price,
        profile: {
          src: lecturer.profileCardImageUrl,
          nickname: lecturer.nickname,
        },
      }),
    );
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
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold ">강사</h2>
          <Link href="/" className="text-gray-300 underline underline-offset-1">
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
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">클래스</h2>
          <Link href="/" className="text-gray-300 underline underline-offset-1">
            클래스 더보기
          </Link>
        </div>
        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-9 md:grid-cols-3 lg:gap-x-4 xl:grid-cols-2 xl:gap-5">
          {classList.map((info) => (
            <ClassPreview key={info.id} {...info} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;

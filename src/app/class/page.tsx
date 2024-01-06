import {
  DANCE_GENRE,
  INSTRUCTOR_TAKE,
  REGIONS_SELECT_MAX,
} from '@/constants/constants';
import { searchBestClass } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { regionsDecryption } from '@/utils/searchFilterFn';
import SearchInput from '@/components/SearchInput/SearchInput';
import { SearchParams } from '@/types/types';

const classPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { userType } = useUserStore.getState();
  let bestClassList = [];

  const searchData = {
    take: INSTRUCTOR_TAKE,
    sortOption:
      searchParams.sortOption &&
      (searchParams.sortOption === 'LATEST' ||
        searchParams.sortOption === 'STARS')
        ? searchParams.sortOption
        : 'LATEST',
    value: searchParams.query,
    genres: [
      ...new Set(
        Array.isArray(searchParams.genre)
          ? searchParams.genre
          : searchParams.genre
          ? [searchParams.genre]
          : [],
      ),
    ].filter((genre) => DANCE_GENRE.includes(genre)),
    regions: [...new Set(regionsDecryption(searchParams.regions))].slice(
      0,
      REGIONS_SELECT_MAX,
    ),
    stars: searchParams.stars ?? 0,
  };

  try {
    bestClassList = await searchBestClass(userType === 'user');
  } catch (error) {}

  return (
    <section className="flex flex-col">
      <div className="my-4 px-4 sm:px-9 xl:px-14">
        <SearchInput query={searchData.value ?? ''} />
      </div>
    </section>
  );
};

export default classPage;

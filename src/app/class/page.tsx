import { DANCE_GENRE, REGIONS_SELECT_MAX } from '@/constants/constants';
import {
  searchBestClass,
  searchClasses,
} from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformBestClassSearch } from '@/utils/apiDataProcessor';
import { regionsDecryption } from '@/utils/searchFilterFn';
import BestlCasses from './_components/BestlCasses';
import ClassListView from './_components/ClassListView';
import SearchInput from '@/components/SearchInput/SearchInput';
import { ClassCardType } from '@/types/class';
import { SearchParams, classSearchData } from '@/types/types';

const classPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { userType } = useUserStore.getState();
  let bestClassList: ClassCardType[] = [];

  const searchData: classSearchData = {
    take: 8,
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
    isGroup: searchParams.isGroup === 'false' ? false : true,
  };

  try {
    bestClassList = transformBestClassSearch(
      await searchBestClass(userType === 'user'),
    );

    const test = await searchClasses(searchData, userType === 'user');
    console.log(test[1].days);
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col">
      <div className="my-4 px-4 sm:px-9 xl:px-14">
        <SearchInput query={searchData.value ?? ''} />
      </div>
      <BestlCasses bestClassList={bestClassList} />

      <ClassListView searchData={searchData}>
        <div>a</div>
      </ClassListView>
    </section>
  );
};

export default classPage;

import {
  DANCE_GENRE,
  GROUP_FILTER_LIST,
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
  REGIONS_SELECT_MAX,
} from '@/constants/constants';
import {
  searchBestClass,
  searchClasses,
} from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import {
  transformBestClassSearch,
  transformSearchClass,
  transformSearchParamsLocation,
} from '@/utils/apiDataProcessor';
import { regionsDecryption } from '@/utils/searchFilterFn';
import BestlCasses from './_components/BestlCasses';
import ClassListView from './_components/ClassListView';
import Filters from '@/components/Filter/Filters';
import SearchInput from '@/components/SearchInput/SearchInput';
import { ClassCardType } from '@/types/class';
import { IFilterOptions, SearchParams, classSearchData } from '@/types/types';

const classPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { userType } = useUserStore.getState();
  let bestClassList: ClassCardType[] = [];
  let classList: ClassCardType[] = [];

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
    stars:
      searchParams.stars && Number.isInteger(Number(searchParams.stars))
        ? Number(searchParams.stars)
        : 0,
    isGroup: searchParams.group === '프라이빗 레슨(1:1)' ? false : true,
    gtePrice:
      searchParams.gtePrice && Number.isInteger(Number(searchParams.gtePrice))
        ? Number(searchParams.gtePrice)
        : PRICE_FILTER_MIN,
    ltePrice:
      searchParams.ltePrice &&
      Number.isInteger(Number(searchParams.ltePrice)) &&
      Number(searchParams.ltePrice) < PRICE_FILTER_MAX
        ? Number(searchParams.ltePrice)
        : PRICE_FILTER_MAX,
    gteDate:
      searchParams.gteDate && isValidDate(searchParams.gteDate)
        ? new Date(searchParams.gteDate)
        : undefined,
    lteDate:
      searchParams.gteDate &&
      searchParams.lteDate &&
      isValidDate(searchParams.lteDate)
        ? new Date(searchParams.lteDate)
        : undefined,
  };

  const filterOptions: IFilterOptions = {
    regions: transformSearchParamsLocation(searchData.regions),
    genre: searchData.genres,
    review: searchData.stars,
    price:
      searchData.gtePrice >= searchData.ltePrice
        ? [0, searchData.ltePrice]
        : [searchData.gtePrice, searchData.ltePrice],
    date:
      searchData.gteDate &&
      searchData.lteDate &&
      searchData.gteDate >= searchData.lteDate
        ? [searchParams.gteDate!, '']
        : [
            searchData.gteDate ? searchParams.gteDate! : '',
            searchData.lteDate ? searchParams.lteDate! : '',
          ],
    method: [],
    daytime: [],
    group:
      searchParams.group && GROUP_FILTER_LIST.includes(searchParams.group)
        ? searchParams.group
        : '그룹레슨',
  };

  try {
    bestClassList = transformBestClassSearch(
      await searchBestClass(userType === 'user'),
    );

    classList = transformSearchClass(
      await searchClasses(searchData, userType === 'user'),
    );
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col">
      <div className="my-4 px-4 sm:px-9 xl:px-14">
        <SearchInput query={searchData.value ?? ''} />
      </div>
      <BestlCasses bestClassList={bestClassList} />

      <ClassListView searchData={searchData} classList={classList}>
        <Filters type="class" filterOption={filterOptions} />
      </ClassListView>
    </section>
  );
};

export default classPage;

const isValidDate = (dateString: string) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

import { cookies } from 'next/headers';
import { PASSES_TAKE } from '@/constants/constants';
import { searchPasses } from '@/lib/apis/serverApis/searchApis';
import NavComponent from './_components/NavComponent';
import SearchInput from '@/components/SearchInput/SearchInput';

const page = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
    sortOption: 'LATEST' | 'POPULAR' | 'LOWEST_PRICE';
  };
}) => {
  const cookieStore = cookies();
  const user = cookieStore.get('userAccessToken')?.value;

  console.log(searchParams);

  const searchData = {
    take: PASSES_TAKE,
    sortOption:
      searchParams.sortOption &&
      (searchParams.sortOption === 'LATEST' ||
        searchParams.sortOption === 'POPULAR' ||
        searchParams.sortOption === 'LOWEST_PRICE')
        ? searchParams.sortOption
        : 'LATEST',
    value: searchParams.query,
  };

  try {
    const test = await searchPasses(searchData, !!user);
    console.log(test);
  } catch (error) {}

  return (
    <section className="flex flex-col px-4 sm:px-9 xl:px-14">
      <div className="my-4">
        <SearchInput query="" />
      </div>
      <NavComponent />
    </section>
  );
};

export default page;

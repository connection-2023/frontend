import Results from './_components/Results';
import Search from './_components/Search';
import { SearchParams } from '@/types/types';

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  return searchParams.query ? (
    <Results searchParams={searchParams} />
  ) : (
    <Search />
  );
};

export default SearchPage;

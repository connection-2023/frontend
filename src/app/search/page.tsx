import Results from './_components/Results';
import Search from './_components/Search';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  return searchParams.query ? (
    <Results query={searchParams.query} />
  ) : (
    <Search />
  );
};

export default SearchPage;

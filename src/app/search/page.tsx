import Search from './_components/Search';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  return searchParams.query ? <div>sss</div> : <Search />;
};

export default SearchPage;

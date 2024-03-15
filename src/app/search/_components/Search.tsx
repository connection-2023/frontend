import {
  getRecentHistory,
  getPopularKeywords,
} from '@/lib/apis/serverApis/searchApis';
import Close from './search/Close';
import MyKeyword from './search/MyKeyword';
import SearchInput from './search/SearchInput';

export const dynamic = 'force-dynamic';

const H1_STYLE = 'text-black mb-3.5 text-lg font-bold';

const Search = async () => {
  const userKeywords = getRecentHistory();
  const popularKeywords = getPopularKeywords();

  const [userKeywordsData, popularKeywordsData] = await Promise.all([
    userKeywords,
    popularKeywords,
  ]);

  return (
    <div className="border-box mx-auto w-full max-w-[50rem] overflow-hidden px-7">
      <nav className="mb-10 mt-6 flex w-full justify-end">
        <Close />
      </nav>

      <main className="grid-auto-rows-4 border-box grid grid-cols-2">
        <section className="col-span-2 mb-6 block h-12 w-full border-b border-solid border-sub-color1">
          <SearchInput />
        </section>

        <section className="col-span-2 mb-9 w-full">
          <MyKeyword userKeywords={userKeywordsData} />
        </section>

        {/* <section className="col-span-2 mb-10 md:col-span-1 md:mb-0">
          <h1 className={H1_STYLE}>이런 검색어는 어떠세요?</h1>
          <ul className="flex flex-wrap gap-2">
            {dummySearchData.suggestion.map((keyword, index) => (
              <ListItem key={index} label={keyword} />
            ))}
          </ul>
        </section> */}

        <section>
          <h1 className={H1_STYLE}>인기 검색어</h1>
          <ul className="flex flex-col divide-y divide-solid divide-gray-700">
            {popularKeywordsData.map(({ searchTerm }, i) => (
              <li
                key={i}
                className="ml-2 flex h-10 cursor-pointer items-center whitespace-nowrap text-base"
              >
                <span className="mr-4 font-bold text-sub-color1">{i + 1}</span>
                {searchTerm}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Search;

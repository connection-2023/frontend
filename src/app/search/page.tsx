import Close from './_components/Close';
import MyKeyword from './_components/MyKeyword';
import SearchInput from './_components/SearchInput';
import ListItem from './_components/ListItem';
import { dummySearchData } from '@/constants/dummy';

const SearchPage = async () => {
  return (
    <div className="border-box mx-auto w-full max-w-[50rem] overflow-hidden px-[30px]">
      <nav className="mb-10 mt-[1.69rem] flex w-full justify-end">
        <Close />
      </nav>

      <main className="grid-auto-rows-4 border-box grid grid-cols-2">
        <section className="col-span-2 mb-[1.56rem] block h-[3rem] w-full border-b border-solid border-sub-color1">
          <SearchInput />
        </section>

        <section className="col-span-2 mb-[2.25rem] w-full">
          <MyKeyword userKeywords={dummySearchData.userKeywords} />
        </section>

        <Section title="이런 검색어는 어떠세요?">
          <ul className="flex flex-wrap gap-2">
            {dummySearchData.suggestion.map((keyword, index) => (
              <ListItem key={index} label={keyword} />
            ))}
          </ul>
        </Section>

        <Section title="인기 검색어">
          <ul className="flex flex-col divide-y divide-solid divide-[#D9D9D9]">
            {dummySearchData.popular.map((keyword, i) => (
              <li
                key={i}
                className="ml-[7px] flex h-[2.62rem] cursor-pointer items-center whitespace-nowrap text-base"
              >
                <span className="mr-4 font-bold text-sub-color1">{i + 1}</span>
                {keyword}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
};

export default SearchPage;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section>
      <h1 className="text-[rgba(0, 0, 0, 0.90)] mb-[0.88rem] text-lg font-bold">
        {title}
      </h1>
      {children}
    </section>
  );
};

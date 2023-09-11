import Close from './Close';
import MyKeyword from './MyKeyword';
import SearchInput from './SearchInput';
import ListItem from './ListItem';

const popularKeywords = [
  '스트릿 우먼 파이터',
  '원데이 클래스',
  '커스틴',
  'K-pop',
  '원밀리언',
];

const suggestKeywords = [
  'K-pop',
  '원데이 클래스',
  '스트릿 댄스',
  '댄스 초보 수업',
  '기본기 클래스',
];

export default function SearchPage() {
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
          <MyKeyword />
        </section>

        <Section title="이런 검색어는 어떠세요?">
          <ul className="flex flex-wrap gap-2">
            {suggestKeywords.map((keyword, index) => (
              <ListItem key={index} label={keyword} />
            ))}
          </ul>
        </Section>

        <Section title="인기 검색어">
          <ul className="flex flex-col divide-y divide-solid divide-[#D9D9D9]">
            {popularKeywords.map((keyword, i) => (
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
}

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

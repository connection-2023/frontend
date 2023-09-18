'use client';
import ListItem from './ListItem';

const MyKeyword = ({ userKeywords }: { userKeywords: string[] }) => {
  const onClickRemoveAll = () => {};

  return (
    <>
      <div className="mb-[0.88rem] flex items-center justify-between">
        <h1 className="text-[rgba(0, 0, 0, 0.90)] text-lg font-bold">
          최근 검색어
        </h1>
        <button
          className="text-sm text-[#B6B6B6] underline"
          onClick={onClickRemoveAll}
        >
          전체삭제
        </button>
      </div>
      <ul className="flex h-[58px] gap-2 overflow-x-auto">
        {userKeywords.map((keyword, i) => (
          <ListItem label={keyword} key={i} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyword;

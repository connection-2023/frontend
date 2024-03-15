'use client';
import { useRouter } from 'next/navigation';
import { deleteAllSearchKeywords } from '@/lib/apis/searchApis';
import ListItem from './ListItem';
import { IUserSearchKeywords } from '@/types/types';

const MyKeyword = ({
  userKeywords,
}: {
  userKeywords: IUserSearchKeywords[];
}) => {
  const router = useRouter();

  const onClickRemoveAll = async () => {
    await deleteAllSearchKeywords();
    router.refresh();
  };

  return (
    <>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-100">최근 검색어</h1>
        <button
          className="text-sm text-gray-500 underline"
          onClick={onClickRemoveAll}
        >
          전체삭제
        </button>
      </div>
      <ul className="flex gap-2 overflow-x-auto">
        {userKeywords.map((keyword) => (
          <ListItem key={keyword.id} {...keyword} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyword;

'use client';
import { useRouter } from 'next/navigation';
import { SEARCH_LOCAL_STORAGE_KEY } from '@/constants/constants';
import { deleteAllSearchKeywords } from '@/lib/apis/searchApis';
import { useUserStore } from '@/store';
import ListItem from './ListItem';
import { IUserSearchKeywords } from '@/types/types';

const MyKeyword = ({
  userKeywords,
}: {
  userKeywords: IUserSearchKeywords[];
}) => {
  const localStorage = window.localStorage;
  const authUser = useUserStore((state) => state.authUser);
  const router = useRouter();

  const userKeywordList = authUser
    ? userKeywords
    : localStorage
        .getItem(SEARCH_LOCAL_STORAGE_KEY)
        ?.split(',')
        .map((item, index) => {
          return { id: index, searchTerm: item };
        });

  const onClickRemoveAll = async () => {
    if (authUser) {
      await deleteAllSearchKeywords();
    } else {
      localStorage.removeItem(SEARCH_LOCAL_STORAGE_KEY);
    }

    router.refresh();
  };

  return (
    <>
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-100">최근 검색어</h1>
        {userKeywordList?.length && (
          <button
            className="text-sm text-gray-500 underline"
            onClick={onClickRemoveAll}
          >
            전체삭제
          </button>
        )}
      </div>
      <ul className="flex gap-2 overflow-x-auto">
        {userKeywordList?.map((keyword) => (
          <ListItem key={keyword.id} {...keyword} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyword;

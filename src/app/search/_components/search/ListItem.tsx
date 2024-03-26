import { useRouter } from 'next/navigation';
import { SEARCH_LOCAL_STORAGE_KEY } from '@/constants/constants';
import { CloseSVG } from '@/icons/svg';
import { deleteSearchKeyword } from '@/lib/apis/searchApis';
import { useUserStore } from '@/store';
import { IUserSearchKeywords } from '@/types/types';

const ListItem = ({ id, searchTerm }: IUserSearchKeywords) => {
  const authUser = useUserStore((state) => state.authUser);
  const localStorage = window.localStorage;
  const router = useRouter();

  const handleClickList = () => {
    router.push(`/search?query=${searchTerm}`);
  };

  const handleClickDelete = async (event: MouseEvent) => {
    event.stopPropagation();
    if (authUser) {
      await deleteSearchKeyword(id);
    } else {
      const prevKeys = localStorage.getItem(SEARCH_LOCAL_STORAGE_KEY);
      if (!prevKeys) return;

      const newSearchKeys = prevKeys
        .split(',')
        .filter((item) => item !== searchTerm);

      newSearchKeys.length
        ? localStorage.setItem(
            SEARCH_LOCAL_STORAGE_KEY,
            newSearchKeys.join(','),
          )
        : localStorage.removeItem(SEARCH_LOCAL_STORAGE_KEY);
    }

    router.refresh();
  };

  return (
    <li
      onClick={handleClickList}
      className="mb-1 flex cursor-pointer items-center whitespace-nowrap rounded-[3.125rem] bg-gray-900 py-1.5 pl-4 pr-2 text-base text-black"
    >
      {searchTerm}

      <button aria-label="검색 기록 지우기" className="ml-1">
        <CloseSVG
          width={22}
          height={19}
          onClick={handleClickDelete}
          className="stroke-gray-500 stroke-2"
        />
      </button>
    </li>
  );
};

export default ListItem;

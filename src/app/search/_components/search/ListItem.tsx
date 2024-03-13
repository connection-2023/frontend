import { useRouter } from 'next/navigation';
import { CloseSVG } from '@/icons/svg';
import { deleteSearchKeyword } from '@/lib/apis/searchApis';
import { IUserSearchKeywords } from '@/types/types';

const ListItem = ({ id, searchTerm }: IUserSearchKeywords) => {
  const router = useRouter();

  const handleClickList = () => {
    router.push(`/search?query=${searchTerm}`);
  };

  const handleClickDelete = async (event: MouseEvent) => {
    event.stopPropagation();
    await deleteSearchKeyword(id);
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

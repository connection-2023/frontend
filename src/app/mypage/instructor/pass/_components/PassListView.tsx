'use client';
import { useRouter } from 'next-nprogress-bar';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import usePageNation from '@/hooks/usePageNation';
import { NotFoundSVG } from '@/icons/svg';
import { getIssuedPassLists } from '@/lib/apis/passApis';
import { usePassSelectStore } from '@/store/passSelectStore';
import PassLoading from './loading/PassLoading';
import CouponLoading from '../../coupon/_components/loading/CouponLoading';
import ClassFilterSelect from '@/components/Filter/ClassSelectFilter';
import Pagination from '@/components/Pagination/Pagination';
import PaginationLoading from '@/components/Pagination/PaginationLoading';
import InstructorPass from '@/components/Pass/InstructorPass';
import { IgetFunction, SelectClassType } from '@/types/coupon';
import { IpassData } from '@/types/pass';

interface PassListViewProps {
  initialData: { count: number; item: IpassData[] };
  myLectureList: SelectClassType[];
}

const PassListView = ({ myLectureList, initialData }: PassListViewProps) => {
  const router = useRouter();
  const { setpassInfo } = usePassSelectStore((state) => ({
    setpassInfo: state.setpassInfo,
  }));

  const getListFunctionHandler = async (
    data: IgetFunction,
    signal?: AbortSignal,
  ) => {
    return await getIssuedPassLists(data, 'lecturer', signal);
  };

  const {
    items: passLists,
    totalItemCount,
    filterState,
    isLoading,
    changeFilterState,
    changePage,
  } = usePageNation<IpassData>({
    initialData,
    defaultFilterState: {
      take: LECTURE_COUPON_TAKE,
      targetPage: 1,
      passStatusOptions: 'AVAILABLE',
      filterOption: 'LATEST',
      lectureId: undefined,
    },
    queryType: 'instructorPass',
    queryFn: getListFunctionHandler,
  });

  const selectClassHandler = (selectedOptions: any) => {
    changeFilterState(
      {
        lectureId:
          selectedOptions.value === 'select-all'
            ? undefined
            : selectedOptions.value,
      },
      true,
    );
  };

  const options: {
    id: 'AVAILABLE' | 'DISABLED';
    label: string;
  }[] = [
    {
      id: 'AVAILABLE',
      label: '활성화된 패스권',
    },
    {
      id: 'DISABLED',
      label: '비활성화된 패스권',
    },
  ];

  const sortOptions: {
    id: 'LATEST' | 'HIGHEST_PRICE' | 'BEST_SELLING';
    label: string;
  }[] = [
    { id: 'LATEST', label: '최신순' },
    { id: 'HIGHEST_PRICE', label: '높은 가격순' },
    { id: 'BEST_SELLING', label: '판매순' },
  ];

  const pageCount = Math.ceil(totalItemCount / LECTURE_COUPON_TAKE);

  return (
    <>
      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
              checked={filterState.passStatusOptions === option.id}
              onChange={() =>
                changeFilterState({ passStatusOptions: option.id }, true)
              }
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-gray-500 peer-checked:text-black"
            >
              {option.label}
            </label>
          </button>
        ))}
        <div className="w-80">
          <ClassFilterSelect
            options={myLectureList}
            value={
              myLectureList.find(
                ({ value }) => value === filterState.lectureId,
              ) ?? myLectureList[0]
            }
            onChange={selectClassHandler}
          />
        </div>
      </nav>

      <nav className="flex gap-2.5 py-4">
        {filterState.passStatusOptions === 'AVAILABLE' &&
          sortOptions.map((option) => (
            <button
              key={option.id}
              className={`flex text-sm font-bold ${
                filterState.filterOption !== option.id && 'text-gray-500'
              }`}
              onClick={() => changeFilterState({ filterOption: option.id })}
            >
              {option.label}
            </button>
          ))}
      </nav>

      {isLoading ? (
        <PassLoading />
      ) : passLists.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 pb-4 sm:justify-normal">
          {passLists.map((pass) => (
            <InstructorPass
              key={pass.id}
              passInfo={pass}
              selectPassHandler={() => {
                setpassInfo(pass);
                router.push(`/mypage/instructor/pass/${pass.id}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
          <NotFoundSVG />
          <p>해당 패스권이 없습니다!</p>
        </div>
      )}

      {passLists.length > 0 && pageCount === 0 ? (
        <PaginationLoading />
      ) : (
        pageCount > 0 && (
          <nav className="my-8">
            <Pagination
              pageCount={pageCount}
              currentPage={
                filterState.currentPage ? filterState.currentPage - 1 : 0
              }
              onPageChange={changePage}
            />
          </nav>
        )
      )}
    </>
  );
};

export default PassListView;

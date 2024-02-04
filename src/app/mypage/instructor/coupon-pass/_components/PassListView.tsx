'use client';
import Link from 'next/link';
import { useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { NotFoundSVG, PassSVG } from '@/icons/svg';
import { getIssuedPassLists } from '@/lib/apis/passApis';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelect from './ClassFilterSelect';
import Button from '@/components/Button/Button';
import Pagination from '@/components/Pagination/Pagination';
import InstructorPass from '@/components/Pass/InstructorPass';
import Spinner from '@/components/Spinner/Spinner';
import {
  IgetListFunctionHandler,
  IonChangeItemList,
  SelectClassType,
} from '@/types/coupon';
import { IpassData } from '@/types/pass';

interface PassListViewProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  passList: IpassData[];
  couponCount: number;
  selectPassHandler: (data: IpassData | null) => void;
}

const PassListView = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  passList,
  couponCount,
  selectPassHandler,
}: PassListViewProps) => {
  const [passLists, setPassLists] = useState(passList);

  const onChangeItemList = ({ itemList, prevPage }: IonChangeItemList) => {
    if (prevPage) {
      setPassLists((prevList) => [...prevList, ...(itemList ? itemList : [])]);
    } else {
      setPassLists([...itemList]);
    }
  };

  const getListFunctionHandler = async ({
    data,
    signal,
    type,
  }: IgetListFunctionHandler) => {
    return await getIssuedPassLists(data, 'lecturer', signal);
  };

  const {
    width,
    loading,
    filterState,
    totalItemCount,
    handleFilterOptionChange,
    handleChangeOptions,
    handleChangeSelectedClass,
    lastItemElementRef,
    handleChangePage,
  } = useCouponPassHook({
    myLectureList,
    defaultItemCount,
    itemList: passList,
    onChange: onChangeItemList,
    getFunction: getListFunctionHandler,
    type: 'lecturer',
    isInterested: 'PASS',
  });

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

  return (
    <>
      <nav className="flex justify-between pb-2">
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            className={`flex text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'PASS' && 'text-gray-500'
            }`}
            onClick={() =>
              window.location.replace(
                '/mypage/instructor/coupon-pass?state=coupon',
              )
            }
          >
            쿠폰({couponCount ?? 0})
          </button>
          <button
            className={`text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'COUPON' && 'text-gray-500'
            }`}
            disabled={true}
          >
            패스권({totalItemCount ?? 0})
          </button>
        </div>
        <div className="w-[8rem]">
          <Button>
            <Link
              href={{
                pathname: '/mypage/instructor/coupon-pass/pass',
              }}
              className="flex"
            >
              <PassSVG className="mr-1 fill-sub-color1 group-active:fill-white" />
              패스권 생성
            </Link>
          </Button>
        </div>
      </nav>

      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
              checked={filterState.passStatusOptions === option.id}
              onChange={() => handleChangeOptions(option.id)}
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
            value={filterState.selectedClass}
            onChange={handleChangeSelectedClass}
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
              onClick={() => handleFilterOptionChange(option.id)}
            >
              {option.label}
            </button>
          ))}
      </nav>

      <div className="flex flex-wrap justify-center gap-4 pb-4 sm:justify-normal">
        {passLists.map((pass, index) => (
          <InstructorPass
            key={pass.id}
            passInfo={pass}
            lastItemElementRef={
              passLists.length === index + 1 &&
              passLists.length < totalItemCount &&
              width < 640
                ? lastItemElementRef
                : undefined
            }
            selectPassHandler={selectPassHandler}
          />
        ))}
      </div>
      {loading && width < 640 && (
        <div className="mb-5 flex justify-center">
          <Spinner />
        </div>
      )}

      {!!totalItemCount ? (
        <nav className="my-8 hidden sm:block">
          <Pagination
            pageCount={Math.ceil(totalItemCount / LECTURE_COUPON_TAKE)}
            currentPage={
              filterState.targetPage === 0 ? 0 : filterState.targetPage - 1
            }
            onPageChange={handleChangePage}
          />
        </nav>
      ) : (
        <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
          <NotFoundSVG />
          <p>해당 패스권이 없습니다!</p>
        </div>
      )}
    </>
  );
};

export default PassListView;

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { CouponSVG, NotFoundSVG } from '@/icons/svg';
import { getCouponLists } from '@/lib/apis/couponApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelect from './ClassFilterSelect';
import Button from '@/components/Button/Button';
import CouponComponent from '@/components/Coupon/CouponContainer';
import Pagination from '@/components/Pagination/Pagination';
import Spinner from '@/components/Spinner/Spinner';
import {
  IgetListFunctionHandler,
  IonChangeItemList,
  SelectClassType,
  couponGET,
} from '@/types/coupon';

interface CouponViewProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
  passCount: number;
}

const CouponView = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  couponList,
  passCount,
}: CouponViewProps) => {
  const [couponLists, setCouponLists] = useState(couponList);

  const onChangeItemList = ({ itemList, prevPage }: IonChangeItemList) => {
    const couponList = itemList.map(mapItemToCoupon);

    if (prevPage) {
      setCouponLists((prevList) => [
        ...prevList,
        ...(couponList ? couponList : []),
      ]);
    } else {
      setCouponLists([...couponList]);
    }
  };

  const getListFunctionHandler = async ({
    data,
    signal,
  }: IgetListFunctionHandler) => {
    return await getCouponLists(data, 'lecturer', signal);
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
    itemList: couponList,
    onChange: onChangeItemList,
    getFunction: getListFunctionHandler,
    type: 'lecturer',
    isInterested: 'COUPON',
  });

  const options: {
    id: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
    label: string;
  }[] = [
    {
      id: 'AVAILABLE',
      label: '활성화 쿠폰',
    },
    {
      id: 'DISABLED',
      label: '만료 쿠폰',
    },
  ];

  const sortOptions: {
    id: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING';
    label: string;
  }[] = [
    { id: 'LATEST', label: '최신순' },
    { id: 'UPCOMING', label: '기간 임박순' },
  ];

  return (
    <section className="z-0 flex w-full flex-col px-3 sm:px-6 md:px-9 xl:px-0">
      <div className="z-0 flex w-full flex-col rounded-lg bg-white p-5 shadow-float">
        <nav className="flex justify-between pb-2">
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              className={`flex text-xl font-bold sm:text-2xl ${
                filterState.isInterested === 'PASS' && 'text-gray-500'
              }`}
              disabled={true}
            >
              쿠폰({totalItemCount ?? 0})
            </button>
            <button
              className={`text-xl font-bold sm:text-2xl ${
                filterState.isInterested === 'COUPON' && 'text-gray-500'
              }`}
              onClick={() =>
                window.location.replace(
                  '/mypage/instructor/coupon-pass?state=pass',
                )
              }
            >
              패스권({passCount ?? 0})
            </button>
          </div>

          <div className="w-[7.3rem]">
            <Button>
              <Link
                href={{
                  pathname: '/mypage/instructor/coupon-pass/coupon',
                  query: { type: 'CREATE', state: 'coupon' },
                }}
                className="flex"
              >
                <CouponSVG className="mr-1 h-6 w-6 fill-sub-color1 group-active:fill-white" />
                쿠폰 생성
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
          <CouponComponent
            couponList={couponLists}
            lastItemElementRef={lastItemElementRef}
            totalItemCount={totalItemCount}
            type="lecturer"
            expiration={filterState.passStatusOptions}
          />
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
            <p>해당 쿠폰이 없습니다!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponView;

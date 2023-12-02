'use client';
import Link from 'next/link';
import { useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { CouponSVG, NotFoundSVG } from '@/icons/svg';
import { getLecturerCoupons } from '@/lib/apis/couponApis';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';
import Button from '@/components/Button/Button';
import Pagination from '@/components/Pagination/Pagination';
import Spinner from '@/components/Spinner/Spinner';
import {
  IgetListFunctionHandler,
  IonChangeItemList,
  SelectClassType,
  couponGET,
} from '@/types/coupon';

interface CouponPassProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
}

const CouponPass = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  couponList,
}: CouponPassProps) => {
  const [couponLists, setCouponLists] = useState(couponList);

  const onChangeItemList = ({
    itemList,
    prevPage,
    type,
  }: IonChangeItemList) => {
    if (type === 'COUPON') {
      if (prevPage) {
        setCouponLists((prevList) => [
          ...prevList,
          ...(itemList ? itemList : []),
        ]);
      } else {
        setCouponLists([...itemList]);
      }
    } else {
    }
  };

  const getListFunctionHandler = async ({
    type,
    data,
    signal,
  }: IgetListFunctionHandler) => {
    // if (type === 'COUPON') {} else {}
    return await getLecturerCoupons(data, signal);
  };

  const {
    width,
    loading,
    filterState,
    totalItemCount,
    handleFilterOptionChange,
    handleInterestChange,
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
  });

  const options: { id: 'AVAILABLE' | 'DISABLED'; label: string }[] = [
    {
      id: 'AVAILABLE',
      label:
        filterState.isInterested === 'COUPON'
          ? '활성화 쿠폰'
          : '활성화된 패스권',
    },
    {
      id: 'DISABLED',
      label:
        filterState.isInterested === 'COUPON'
          ? '만료 쿠폰'
          : '비활성화된 패스권',
    },
  ];

  const sortOptions: {
    id: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING';
    label: string;
  }[] =
    filterState.isInterested === 'COUPON'
      ? [
          { id: 'LATEST', label: '최신순' },
          { id: 'UPCOMING', label: '기간 임박순' },
        ]
      : [
          { id: 'LATEST', label: '최신순' },
          { id: 'HIGHEST_PRICE', label: '높은 가격순' },
          { id: 'BEST_SELLING', label: '판매순' },
        ];

  return (
    <section className="z-0 col-span-2 flex w-full flex-col bg-white px-2 pt-5 sm:px-5">
      <nav className="flex justify-between pb-2">
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            className={`flex text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'PASS' && 'text-gray-500'
            }`}
            onClick={() => handleInterestChange('COUPON')}
          >
            쿠폰({totalItemCount ?? 0})
          </button>
          <button
            className={`text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'COUPON' && 'text-gray-500'
            }`}
            onClick={() => handleInterestChange('PASS')}
          >
            패스권
          </button>
        </div>
        <div className="w-[7.3rem]">
          <Button>
            <Link
              href={{
                pathname: '/my/lecturer/coupon-pass/coupon',
                query: { type: 'CREATE' },
              }}
              className="flex"
            >
              <CouponSVG className="mr-1 h-6 w-6 fill-sub-color1 group-active:fill-white" />
              쿠폰 생성
            </Link>
          </Button>
        </div>
      </nav>

      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5 sm:flex-nowrap">
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
        {sortOptions.map((option) => (
          <button
            key={option.id} //check
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
        {filterState.isInterested === 'COUPON' ? (
          <CouponComponent
            couponList={couponLists}
            lastItemElementRef={lastItemElementRef}
            totalItemCount={totalItemCount}
          />
        ) : null}
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
          <p>{`해당 ${
            filterState.isInterested ? '쿠폰' : '패스권'
          }이 없습니다!`}</p>
        </div>
      )}
    </section>
  );
};

export default CouponPass;

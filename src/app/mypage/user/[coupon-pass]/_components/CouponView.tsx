'use client';
import { useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { NotFoundSVG } from '@/icons/svg';
import { getCouponLists } from '@/lib/apis/couponApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelectListsUser from './ClassFilterSelectListsUser';
import ClassFilterSelectUser from './ClassFilterSelectUser';
import CouponContainer from '@/components/Coupon/CouponContainer';
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
}

const CouponView = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  couponList,
}: CouponViewProps) => {
  const [userClassFilterView, setUserClassFilterView] = useState(false);
  const [couponLists, setCouponLists] = useState(couponList);
  const [refreshBtnView, setRefreshBtnView] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const triggerClassListRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  const changeRefreshBtnView = (show: boolean) => {
    setRefreshBtnView(show);
  };

  const changeUserClassFilterView = () => {
    setUserClassFilterView((prev) => !prev);
  };

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
    return await getCouponLists(data, 'user', signal);
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
    type: 'user',
    isInterested: 'COUPON',
  });

  const options: {
    id: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
    label: string;
  }[] = [
    {
      id: 'AVAILABLE',
      label: '사용가능 쿠폰',
    },
    {
      id: 'USED',
      label: '사용한 쿠폰',
    },
    {
      id: 'EXPIRED',
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
    <>
      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-sub-color1"
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
        <div>
          <ClassFilterSelectUser
            filterState={filterState.passStatusOptions}
            userClassFilterView={userClassFilterView}
            changeUserClassFilterView={changeUserClassFilterView}
            refreshBtnView={refreshBtnView}
            triggerClassListRefresh={triggerClassListRefresh}
          />
        </div>
        {filterState.passStatusOptions === 'AVAILABLE' && (
          <ClassFilterSelectListsUser
            userClassFilterView={userClassFilterView}
            myLectureList={myLectureList}
            selectedClass={filterState.selectedClass}
            handleChangeSelectedClass={handleChangeSelectedClass}
            changeRefreshBtnView={changeRefreshBtnView}
            refreshTrigger={refreshTrigger}
          />
        )}
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
        <CouponContainer
          couponList={couponLists}
          lastItemElementRef={lastItemElementRef}
          totalItemCount={totalItemCount}
          type="user"
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
          <p>{`해당 ${
            filterState.isInterested ? '쿠폰' : '패스권'
          }이 없습니다!`}</p>
        </div>
      )}
    </>
  );
};

export default CouponView;

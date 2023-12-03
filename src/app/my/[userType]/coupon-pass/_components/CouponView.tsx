'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { CouponSVG, NotFoundSVG } from '@/icons/svg';
import { getCouponLists } from '@/lib/apis/couponApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelect from './ClassFilterSelect';
import ClassFilterSelectListsUser from './ClassFilterSelectListsUser';
import ClassFilterSelectUser from './ClassFilterSelectUser';
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

interface CouponViewProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
  userType: 'user' | 'lecturer';
}

const CouponView = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  couponList,
  userType,
}: CouponViewProps) => {
  const router = useRouter();
  const [userClassFilterView, setUserClassFilterView] = useState(false);
  const [couponLists, setCouponLists] = useState(couponList);

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
    return await getCouponLists(data, userType, signal);
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
  });

  const options: {
    id: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
    label: string;
  }[] =
    userType === 'lecturer'
      ? [
          {
            id: 'AVAILABLE',
            label: '활성화 쿠폰',
          },
          {
            id: 'DISABLED',
            label: '만료 쿠폰',
          },
        ]
      : [
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
    <section className="z-0 col-span-2 flex w-full flex-col bg-white px-2 pt-5 sm:px-5">
      <nav className="flex justify-between pb-2">
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            className={`flex text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'PASS' && 'text-gray-500'
            }`}
            onClick={() => router.push('/my/lecturer/coupon-pass?state=coupon')}
          >
            쿠폰({totalItemCount ?? 0})
          </button>
          <button
            className={`text-xl font-bold sm:text-2xl ${
              filterState.isInterested === 'COUPON' && 'text-gray-500'
            }`}
            onClick={() => router.push('/my/lecturer/coupon-pass?state=pass')}
          >
            패스권
          </button>
        </div>
        {userType === 'lecturer' && (
          <div className="w-[7.3rem]">
            <Button>
              <Link
                href={{
                  pathname: '/my/lecturer/coupon-pass/management',
                  query: { type: 'CREATE', state: 'coupon' },
                }}
                className="flex"
              >
                <CouponSVG className="mr-1 h-6 w-6 fill-sub-color1 group-active:fill-white" />
                쿠폰 생성
              </Link>
            </Button>
          </div>
        )}
      </nav>

      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className={`peer h-[18px] w-[18px] ${
                userType === 'user' ? 'accent-sub-color1' : 'accent-black'
              } `}
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
        <div className={`${userType === 'user' ? '' : 'w-80'}`}>
          {userType === 'user' ? (
            <ClassFilterSelectUser
              userClassFilterView={userClassFilterView}
              changeUserClassFilterView={changeUserClassFilterView}
            />
          ) : (
            <ClassFilterSelect
              options={myLectureList}
              value={filterState.selectedClass}
              onChange={handleChangeSelectedClass}
            />
          )}
        </div>
        {userType === 'user' && userClassFilterView && (
          <ClassFilterSelectListsUser />
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
        <CouponComponent
          couponList={couponLists}
          lastItemElementRef={lastItemElementRef}
          totalItemCount={totalItemCount}
          type={userType}
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
    </section>
  );
};

export default CouponView;

'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CouponSVG, PassSVG } from '@/icons/svg';
import { getIssuedPassLists } from '@/lib/apis/passApis';
import useCouponPassHook from '@/utils/useCouponPassHook';
import ClassFilterSelect from './ClassFilterSelect';
import Button from '@/components/Button/Button';
import InstructorPass from '@/components/Pass/InstructorPass';
import Spinner from '@/components/Spinner/Spinner';
import {
  IgetListFunctionHandler,
  IonChangeItemList,
  SelectClassType,
} from '@/types/coupon';
import { IpassData } from '@/types/pass';

interface PassViewProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  passList: IpassData[];
  couponCount: number;
}

const PassView = ({
  myLectureList,
  totalItemCount: defaultItemCount,
  passList,
  couponCount,
}: PassViewProps) => {
  const router = useRouter();
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
    <section className="z-0 flex w-full flex-col px-3 sm:px-6 md:px-9 xl:px-0">
      <div className="z-0 flex w-full flex-col rounded-lg bg-white p-5 shadow-float">
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
          {passLists.map((pass) => (
            <InstructorPass key={pass.id} passInfo={pass} />
          ))}
        </div>
        {loading && width < 640 && (
          <div className="mb-5 flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

export default PassView;

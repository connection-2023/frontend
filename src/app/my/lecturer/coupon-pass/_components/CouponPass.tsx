'use client';
import { useEffect, useState } from 'react';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';
import Pagination from '@/components/Pagination/Pagination';
import { SelectClassType, couponGET } from '@/types/coupon';

interface CouponPassProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
}

const CouponPass = ({
  myLectureList,
  totalItemCount,
  couponList,
}: CouponPassProps) => {
  const [couponLists, setCouponLists] = useState(couponList);
  const [filterState, setFilterState] = useState({
    isInterested: true,
    passStatusOptions: 'AVAILABLE',
    filterOption: 'LATEST',
    selectedClass:
      myLectureList.length > 0
        ? {
            value: 'select-all',
            label: `전체 클래스(${myLectureList.length - 1})`,
          }
        : null,
    currentPage: 0,
  });

  useEffect(() => {}, [filterState]);

  const handleChangeOptions = (id: string) => {
    setFilterState((prevState) => ({
      ...prevState,
      passStatusOptions: id,
    }));
  };

  const handleChangeSelectedClass = (selectedOptions: any) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedClass: selectedOptions,
    }));
  };

  const handleInterestChange = (isInterested: boolean) => {
    setFilterState((prevState) => ({
      ...prevState,
      isInterested,
      filterOption: 'LATEST',
      passStatusOptions: 'AVAILABLE',
    }));
  };

  const handleFilterOptionChange = (filterOption: string) => {
    setFilterState((prevState) => ({
      ...prevState,
      filterOption,
    }));
  };

  const handleChangePage = (selectedPage: { selected: number }) => {
    setFilterState((prevState) => ({
      ...prevState,
      currentPage: selectedPage.selected,
    }));
  };

  const options = [
    {
      id: 'AVAILABLE',
      label: filterState.isInterested ? '활성화 쿠폰' : '활성화된 패스권',
    },
    {
      id: 'DISABLED',
      label: filterState.isInterested ? '만료 쿠폰' : '비활성화된 패스권',
    },
  ];

  const sortOptions = filterState.isInterested
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
    <section className="z-0 col-span-2 flex w-full flex-col bg-white px-5 pt-5">
      <nav className="flex gap-6 pb-2">
        <button
          className={`flex text-2xl font-bold ${
            !filterState.isInterested && 'text-gray-500'
          }`}
          onClick={() => handleInterestChange(true)}
        >
          쿠폰({totalItemCount})
        </button>
        <button
          className={`text-2xl font-bold ${
            filterState.isInterested && 'text-gray-500'
          }`}
          onClick={() => handleInterestChange(false)}
        >
          패스권
        </button>
      </nav>

      <nav className="flex items-center gap-2 border-y border-solid border-gray-500 py-5">
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

      <div className="flex flex-wrap gap-4">
        {filterState.isInterested ? (
          <CouponComponent couponList={couponLists} />
        ) : null}
      </div>

      <nav className="my-8">
        <Pagination
          pageCount={totalItemCount / LECTURE_COUPON_TAKE}
          currentPage={filterState.currentPage}
          onPageChange={handleChangePage}
        />
      </nav>
    </section>
  );
};

export default CouponPass;

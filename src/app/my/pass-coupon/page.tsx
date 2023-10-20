'use client';
import { useEffect, useState } from 'react';
import {
  MY_COUPON_CLASS_LIST_LENGTH,
  MY_COUPON_FILTER_OPTIONS,
} from '@/constants/constants';
import { dummyCouponClassList } from '@/constants/dummy';
import { FilterSVG, PlusesSVG, ResetSVG } from '@/icons/svg';

// 추후 api 연결시 변수명 및 타입 맞게 변경 예정
const PassCouponPage = () => {
  const [isInterested, setIsInterested] = useState(true);

  const [selectedOption, setSelectedOption] = useState(
    MY_COUPON_FILTER_OPTIONS[0],
  );
  const [sortOption, setSortOption] = useState('최신순');
  const [selectClassFilter, setSelectClassFilter] =
    useState(dummyCouponClassList);

  const [classListLength, setClassListLength] = useState(
    MY_COUPON_CLASS_LIST_LENGTH,
  );
  const [classFilter, setClassFilter] = useState(false);
  const [refreshButton, setRefreshButton] = useState(false);

  useEffect(() => {
    if (
      dummyCouponClassList.length === selectClassFilter.length &&
      classListLength === MY_COUPON_CLASS_LIST_LENGTH
    ) {
      setRefreshButton(false);
    } else {
      setRefreshButton(true);
    }
  }, [classListLength, selectClassFilter]);

  useEffect(() => {
    //추후 api 요청 예정
  }, [selectClassFilter, sortOption, selectedOption]);

  const classFilterChange = (className: string) => {
    setSelectClassFilter((prev) => {
      if (prev.length === dummyCouponClassList.length) {
        return [className];
      } else if (prev.includes(className)) {
        return prev.length - 1 === 0
          ? [...dummyCouponClassList]
          : prev.filter((item) => item !== className);
      } else {
        return [...prev, className];
      }
    });
  };

  const classFilterReset = () => {
    setSelectClassFilter([...dummyCouponClassList]);
    setClassListLength(MY_COUPON_CLASS_LIST_LENGTH);
  };

  const changeSelectedOption = (option: string) => {
    if (MY_COUPON_FILTER_OPTIONS[0] !== option) {
      setClassFilter(false);
    }
    setSelectedOption(option);
  };

  const classFilterViewChange = () => {
    setClassFilter((prev) => {
      if (!prev) {
        setSelectedOption(MY_COUPON_FILTER_OPTIONS[0]);
      }
      return !prev;
    });
  };

  return (
    <section className="mx-auto flex w-full flex-col p-4 text-sm">
      <nav className="mb-2 flex gap-6">
        <button
          className={`flex text-2xl font-bold hover:text-black ${
            !isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(true)}
        >
          쿠폰({4})
        </button>
        <button
          className={`text-2xl font-bold hover:text-black ${
            isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(false)}
        >
          패스권({4})
        </button>
      </nav>

      <nav className="flex flex-wrap gap-5 border-y border-solid border-sub-color4 py-5">
        {MY_COUPON_FILTER_OPTIONS.map((option) => (
          <button key={option} className="flex items-center gap-1">
            <input
              id={option}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-sub-color1"
              checked={selectedOption === option}
              onChange={() => changeSelectedOption(option)}
            />
            <label
              htmlFor={option}
              className="flex cursor-pointer text-sub-color2
              peer-checked:text-black
                "
            >
              {option}
            </label>
          </button>
        ))}

        <button
          className={`group flex items-center gap-2 hover:text-black ${
            !classFilter && 'text-sub-color2'
          }`}
          onClick={classFilterViewChange}
        >
          <FilterSVG
            className={`h-5 w-5 group-hover:fill-black ${
              classFilter ? 'fill-black' : 'fill-sub-color2'
            }`}
          />
          적용 가능한 모든 클래스 보기
        </button>

        {classFilter && refreshButton && (
          <button
            className="group flex items-center gap-1 font-bold text-sub-color2 hover:text-black"
            onClick={classFilterReset}
          >
            초기화
            <ResetSVG className="-translate-y-[1px] fill-sub-color2 group-hover:fill-black" />
          </button>
        )}

        {classFilter && (
          <ul className={`flex flex-wrap gap-1 ${classFilter ? '' : ''}`}>
            {dummyCouponClassList
              .slice(0, classListLength)
              .map((className, index) => {
                const isSelected = selectClassFilter.includes(className);
                return (
                  <li
                    key={className + index}
                    className={`mr-4 flex h-7 items-center ${
                      isSelected ? 'text-sub-color1' : 'text-sub-color2'
                    } hover:font-semibold`}
                    onClick={() => classFilterChange(className)}
                  >
                    <button>{className}</button>
                  </li>
                );
              })}
            <button
              className={`flex items-center gap-1 font-semibold text-sub-color2 underline ${
                dummyCouponClassList.length <= classListLength && 'hidden'
              }`}
              onClick={() =>
                setClassListLength((prev) => prev + MY_COUPON_CLASS_LIST_LENGTH)
              }
            >
              더보기
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-solid border-sub-color2">
                <PlusesSVG className="h-4 w-4 fill-sub-color1" />
              </div>
            </button>
          </ul>
        )}
      </nav>

      <nav className="my-4 flex gap-4">
        <button
          className={`${
            sortOption !== '최신순' && 'text-sub-color2'
          } hover:text-black`}
          onClick={() => setSortOption('최신순')}
        >
          최신순
        </button>
        <button
          className={`${
            sortOption !== '기간 임박순' && 'text-sub-color2'
          } hover:text-black`}
          onClick={() => setSortOption('기간 임박순')}
        >
          기간 임박순
        </button>
      </nav>
    </section>
  );
};

export default PassCouponPage;

'use client';
import { useRef, useState } from 'react';
import { MY_COUPON_FILTER_OPTIONS } from '@/constants/constants';
import { dummyCouponClassList } from '@/constants/dummy';
import { FilterSVG, PlusesSVG } from '@/icons/svg';

const PassCouponPage = () => {
  const [isInterested, setIsInterested] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    MY_COUPON_FILTER_OPTIONS[0],
  );
  const [classFilter, setClassFilter] = useState(false);
  const [sortOption, setSortOption] = useState('최신순');
  // 추후 api 연결시 변수명 맞게 변경 예정

  const filterChange = (option: string) => {};

  return (
    <section className="mx-auto flex w-full flex-col p-4">
      <nav className="mb-2 flex gap-6">
        <button
          className={`flex text-2xl font-bold ${
            !isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(true)}
        >
          쿠폰({4})
        </button>
        <button
          className={`text-2xl font-bold ${isInterested && 'text-sub-color2'}`}
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
              onChange={() => setSelectedOption(option)}
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
          className={`flex items-center gap-2 ${
            !classFilter && 'text-sub-color2'
          }`}
          onClick={() => setClassFilter((prev) => !prev)}
        >
          <FilterSVG
            className={`h-5 w-5  ${
              classFilter ? 'fill-black' : 'fill-sub-color2'
            }`}
          />
          적용 가능한 모든 클래스 보기
        </button>

        <ul className="flex flex-wrap gap-1">
          {dummyCouponClassList.map((className, index) => (
            <li
              key={className + index}
              className="mr-4 flex h-7 items-center text-sub-color1"
            >
              {className}
            </li>
          ))}
          <button className="flex items-center gap-1 font-semibold text-sub-color2 underline">
            더보기
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-solid border-sub-color2">
              <PlusesSVG className="h-4 w-4 fill-sub-color1" />
            </div>
          </button>
        </ul>
      </nav>

      <nav className="my-4 flex gap-4">
        <button
          className={(sortOption !== '최신순' && 'text-sub-color2') || ''}
          onClick={() => setSortOption('최신순')}
        >
          최신순
        </button>
        <button
          className={(sortOption !== '기간 임박순' && 'text-sub-color2') || ''}
          onClick={() => setSortOption('기간 임박순')}
        >
          기간 임박순
        </button>
      </nav>
    </section>
  );
};

export default PassCouponPage;

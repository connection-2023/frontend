'use client';
import { ChangeEvent, useMemo, useState } from 'react';
import { NotFoundSVG } from '@/icons/svg';
import Pass from './Pass';
import Carousel from '@/components/Carousel/Carousel';
import { userPassList } from '@/types/pass';

interface PassViewProps {
  passList: userPassList[];
}

const PassView = ({ passList: reqPassList }: PassViewProps) => {
  const [selectOption, setSelectOption] = useState<{
    default: 'AVAILABLE' | 'EXPIRED';
    sort: 'LATEST' | 'UPCOMING' | 'REMAINING_COUNT';
  }>({
    default: 'AVAILABLE',
    sort: 'LATEST',
  });
  const [selectPass, setSelectPass] = useState<userPassList | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>();

  const passList = useMemo(() => {
    const passList = reqPassList.filter(({ isEnabled }) =>
      selectOption.default === 'AVAILABLE' ? isEnabled : !isEnabled,
    );

    if (selectOption.default === 'EXPIRED' || selectOption.sort === 'LATEST')
      return passList;
    else if (selectOption.sort === 'UPCOMING') {
      return passList.sort((a, b) => {
        if (a.endAt === null && b.endAt === null) {
          return 0;
        }
        if (a.endAt === null) {
          return 1;
        }
        if (b.endAt === null) {
          return -1;
        }
        return new Date(b.endAt).getTime() - new Date(a.endAt).getTime();
      });
    } else {
      return passList.sort((a, b) => {
        return b.remainingUses - a.remainingUses;
      });
    }
  }, [reqPassList, selectOption]);

  const options: {
    id: 'AVAILABLE' | 'EXPIRED';
    label: string;
  }[] = [
    {
      id: 'AVAILABLE',
      label: '사용가능',
    },
    {
      id: 'EXPIRED',
      label: '만료',
    },
  ];

  const sortOptions: {
    id: 'LATEST' | 'UPCOMING' | 'REMAINING_COUNT';
    label: string;
  }[] = [
    { id: 'LATEST', label: '최신순' },
    { id: 'UPCOMING', label: '기간 임박순' },
    { id: 'REMAINING_COUNT', label: '잔여 횟수순' },
  ];

  const optionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectOption((prev) => ({
      ...prev,
      default: e.target.id as 'AVAILABLE' | 'EXPIRED',
    }));
  };

  const sortOptionChange = (
    sort: 'LATEST' | 'UPCOMING' | 'REMAINING_COUNT',
  ) => {
    setSelectOption((prev) => ({
      ...prev,
      sort,
    }));
    setCarouselIndex(0);
  };

  const selectedPassChange = (pass: userPassList, index?: number) => {
    if (selectPass?.id === pass.id) {
      setSelectPass(null);
    } else {
      setSelectPass(pass);
      setCarouselIndex(index);
    }
  };

  return (
    <>
      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-sub-color1"
              checked={selectOption.default === option.id}
              onChange={(e) => optionChange(e)}
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-gray-500 peer-checked:text-black"
            >
              {option.label}
            </label>
          </button>
        ))}
      </nav>

      <nav className="flex gap-2.5 py-4">
        {selectOption.default === 'AVAILABLE' &&
          sortOptions.map((option) => (
            <button
              key={option.id}
              className={`flex text-sm font-bold ${
                selectOption.sort !== option.id && 'text-gray-500'
              }`}
              onClick={() => sortOptionChange(option.id)}
            >
              {option.label}
            </button>
          ))}
      </nav>

      {passList.length === 0 ? (
        <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
          <NotFoundSVG />
          <p>해당 패스권이 없습니다!</p>
        </div>
      ) : passList.length > 1 ? (
        <div className="relative sm:px-11">
          <div className="overflow-hidden sm:px-5">
            <div className="w-64 px-2 py-3 sm:px-0">
              <Carousel
                move={!selectPass}
                priority={4}
                gap={1}
                showCurrentElement={false}
                carouselMoveIntervalTime={3000}
                gotoIndex={carouselIndex}
              >
                {(passList.length < 4
                  ? Array(Math.ceil(4 / passList.length))
                      .fill(passList)
                      .flat()
                      .slice(0, 4)
                  : passList
                ).map((passInfo, index) => (
                  <Pass
                    key={passInfo.id}
                    passInfo={passInfo}
                    selectedId={selectPass?.id}
                    selectedPassChange={() =>
                      selectedPassChange(passInfo, index)
                    }
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 w-64">
          <Pass
            passInfo={passList[0]}
            selectedId={selectPass?.id}
            selectedPassChange={() => selectedPassChange(passList[0])}
          />
        </div>
      )}
    </>
  );
};

export default PassView;

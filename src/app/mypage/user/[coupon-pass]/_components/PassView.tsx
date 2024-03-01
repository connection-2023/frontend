'use client';
import { ChangeEvent, useMemo, useState } from 'react';
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
    </>
  );
};

export default PassView;

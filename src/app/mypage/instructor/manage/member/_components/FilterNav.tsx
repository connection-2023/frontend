import { useState } from 'react';
import { SearchSVG } from '@/icons/svg';
import ClassFilterSelect from '../../review/_components/ClassFilterSelect';
import { OptionType } from '@/types/coupon';
import { PagenationFilterState } from '@/types/types';

interface FilterNavProps {
  filterState: PagenationFilterState;
  resetFilter: (key: string, value: any) => void;
  myClassListsOption: OptionType[];
}

const FilterNav = ({
  filterState,
  resetFilter,
  myClassListsOption,
}: FilterNavProps) => {
  const [searchMember, setSearchMember] = useState('');

  const options: {
    id: string;
    label: string;
  }[] = [
    {
      id: 'ALL',
      label: '전체',
    },
    {
      id: 'IN_PROGRESS',
      label: '진행중',
    },
    {
      id: 'COMPLETED',
      label: '종료',
    },
  ];

  const searchMemberHandler = () => {
    // resetFilter('search', searchMember); 추후 백엔드 검색 추가 되면 변경
    console.log(searchMember);
  };

  return (
    <nav className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-0">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex gap-5">
          {options.map((option) => (
            <button key={option.id} className="flex items-center gap-1 text-sm">
              <input
                id={option.id}
                type="checkbox"
                checked={filterState.filterOption === option.id}
                onChange={() => resetFilter('filterOption', option.id)}
                className="peer h-[18px] w-[18px]  accent-black"
              />
              <label
                htmlFor={option.id}
                className="cursor-pointer text-gray-500 peer-checked:text-black"
              >
                {option.label}
              </label>
            </button>
          ))}
        </div>
        <div className="w-80">
          <ClassFilterSelect
            options={myClassListsOption}
            value={
              myClassListsOption.find(
                ({ value }) => value === filterState.lectureId,
              ) ?? myClassListsOption[0]
            }
            onChange={(change: any) => {
              resetFilter('lectureId', change.value);
            }}
            isDisabled={false}
          />
        </div>
      </div>
      <div className="relative h-fit w-fit">
        <input
          type="search"
          name="q"
          placeholder="이름/전화번호로 검색"
          value={searchMember}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              searchMemberHandler();
            }
          }}
          onChange={(event) => setSearchMember(event.target.value)}
          className="no-cancel-button h-8 w-80 rounded-md pl-3 pr-8 outline outline-1 outline-gray-500 focus:outline-sub-color1"
        />
        <button
          className="absolute right-2 top-0.5"
          onClick={searchMemberHandler}
        >
          <SearchSVG className=" h-6 w-6 fill-gray-100" />
        </button>
      </div>
    </nav>
  );
};

export default FilterNav;

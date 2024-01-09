'use client';
import Link from 'next/link';
import useTouchScroll from '@/hooks/useTouchScroll';
import { FilterSVG, ResetSVG } from '@/icons/svg';
import { usefilterPositionnStore } from '@/store/filterPositionnStore';
import DateFilter from './DateFilter';
import DayTimeFilter from './DayTimeFilter';
import GenreFilter from './GenreFilter';
import GroupFilter from './GroupFilter';
import LocationFilter from './LocationFilter';
import MethodFilter from './MethodFilter';
import PriceFilter from './PriceFilter';
import ReviewFilter from './ReviewFilter';
import { IFilterOptions } from '@/types/types';

interface FilterListProps {
  filterOption: IFilterOptions;
  type: 'instructor' | 'class';
}

const FilterList = ({ filterOption, type }: FilterListProps) => {
  const { setIsScrolling } = usefilterPositionnStore();
  const { scrollContainerRef } = useTouchScroll({
    onChangeFn: () => setIsScrolling((prev) => !prev),
  });

  const filterComponents =
    type === 'class'
      ? [
          <LocationFilter filterOption={filterOption.regions} key="location" />,
          <GenreFilter filterOption={filterOption.genre} key="genre" />,
          <ReviewFilter filterOption={filterOption.review} key="review" />,
          <PriceFilter filterOption={filterOption.price} key="price" />,
          <DateFilter filterOption={filterOption.date} key="date" />,
          <GroupFilter filterOption={filterOption.group} key="group" />,
          <MethodFilter filterOption={filterOption.method} key="method" />,
          <DayTimeFilter filterOption={filterOption.daytime} key="daytime" />,
        ]
      : [
          <LocationFilter filterOption={filterOption.regions} key="location" />,
          <GenreFilter filterOption={filterOption.genre} key="genre" />,
          <ReviewFilter filterOption={filterOption.review} key="review" />,
        ];

  return (
    <div className="relative">
      <div
        className="z-20 mb-3 flex w-full items-center gap-2 overflow-x-auto pb-2"
        ref={scrollContainerRef}
      >
        {filterComponents.map((FilterComponent) => FilterComponent)}
        <Link
          href={type === 'instructor' ? '/instructor' : '/class'}
          className="mr-20 flex items-center whitespace-nowrap text-sm font-bold text-gray-300"
        >
          초기화
          <ResetSVG className="ml-1" />
        </Link>
        <button className="absolute right-0 flex h-full items-center justify-center bg-white px-2">
          <FilterSVG className="h-6 w-6 fill-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default FilterList;

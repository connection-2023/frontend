import Link from 'next/link';
import {
  GROUP_FILTER_DEFAULT,
  GROUP_FILTER_LIST,
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
} from '@/constants/constants';
import { ResetSVG } from '@/icons/svg';
import DateFilter from './DateFilter';
import DayTimeFilter from './DayTimeFilter';
import GenreFilter from './GenreFilter';
import GroupFilter from './GroupFilter';
import LocationFilter from './LocationFilter';
import MethodFilter from './MethodFilter';
import OptionList from './OptionList';
import PriceFilter from './PriceFilter';
import ReviewFilter from './ReviewFilter';
import { WARD_LIST } from '../../constants/administrativeDistrict';
import ResetButton from '../Button/ResetButton';
import { day } from '@/types/class';
import { IFilterOptions } from '@/types/types';

interface FiltersProps {
  type: 'instructor' | 'class';
  filterOption: IFilterOptions;
}

const Filters = async ({ type, filterOption }: FiltersProps) => {
  // console.log(filterOption);
  const options = Object.entries(filterOption).reduce<
    { type: string; value: string }[]
  >((acc, [key, value]) => {
    // 값이 없는 경우 저장하지 않음
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (key === 'review' && value === 0)
    ) {
      return acc;
    }
    if (Array.isArray(value)) {
      if (key === 'price') {
        const [min, max] = value;
        if (max === PRICE_FILTER_MAX && min === PRICE_FILTER_MIN) {
          return acc;
        }
        acc.push({ type: key, value: value.join(', ') });
      } else if (key === 'date') {
        acc.push({ type: key, value: value.join(', ') });
      } else {
        acc.push(...value.map((v) => ({ type: key, value: v })));
      }
    } else if (typeof value === 'object') {
      if (key === 'regions') {
        for (const city in value) {
          if (!WARD_LIST[city]) {
            return acc;
          }
          const allWards = WARD_LIST[city].length;
          if (value[city].length === allWards) {
            acc.push({ type: key, value: `${city} > 전 지역` });
          } else {
            for (const district of value[city]) {
              acc.push({ type: key, value: `${city} > ${district}` });
            }
          }
        }
      } else {
        const { week, time } = value;

        const weekItems = week.map((day: day) => ({
          type: 'week',
          value: day,
        }));
        const timeItems = time.map((time: string) => ({
          type: 'time',
          value: time,
        }));

        acc.push(...weekItems, ...timeItems);
      }
    } else if (key === 'group' && value === GROUP_FILTER_DEFAULT) {
      return acc;
    } else if (key === 'method' && value === '전체') {
      return acc;
    } else {
      acc.push({ type: key, value });
    }
    return acc;
  }, []);

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
    <>
      <ul className="flex w-full flex-wrap gap-x-5 gap-y-1">
        {options.map(
          (option) =>
            option.type &&
            option.value && (
              <OptionList
                key={`${option.type}-${option.value}`}
                option={option}
              />
            ),
        )}
      </ul>
      <div className="z-20 mb-3 flex w-full flex-wrap items-center gap-2">
        {filterComponents.map((filter) => filter)}
        <Link
          href={type === 'instructor' ? '/instructor' : '/class'}
          className="flex items-center whitespace-nowrap text-sm font-bold text-gray-300"
        >
          초기화
          <ResetSVG className="ml-1" />
        </Link>
      </div>
    </>
  );
};

export default Filters;

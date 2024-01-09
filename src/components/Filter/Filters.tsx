import {
  GROUP_FILTER_DEFAULT,
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
} from '@/constants/constants';
import FilterList from './FilterList';
import OptionList from './OptionList';
import { WARD_LIST } from '../../constants/administrativeDistrict';
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
      <FilterList filterOption={filterOption} type={type} />
    </>
  );
};

export default Filters;

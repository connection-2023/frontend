import { useEffect } from 'react';
import { WARD_LIST } from '@/constants/administrativeDistrict';
import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/constants/constants';
import { ArrowDownSVG, ArrowUpSVG } from '@/icons/svg';
import { usefilterStore } from '@/store/filterStore';
import Accordion from '../Accordion/Accordion';
import ResetButton from '../Button/ResetButton';
import { Regions } from '@/types/instructor';
import { DayTimeFilterOption } from '@/types/types';

interface FilterAccordionProps {
  filterList:
    | Regions
    | string[]
    | number
    | number[]
    | (string | undefined)[]
    | string
    | DayTimeFilterOption;
  label: string;
  children: React.ReactNode;
  onReset: () => void;
}

const FilterAccordion = ({
  children,
  label,
  filterList,
  onReset,
}: FilterAccordionProps) => {
  const {
    openFilterLabel,
    setOpenFilterLabel,
    addResetFunction,
    filterListUpdate,
  } = usefilterStore((state) => ({
    openFilterLabel: state.openFilterLabel,
    setOpenFilterLabel: state.setOpenFilterLabel,
    addResetFunction: state.addResetFunction,
    filterListUpdate: state.filterListUpdate,
  }));
  const isOpened = openFilterLabel === label;

  useEffect(() => {
    addResetFunction(onReset);
  }, []);

  useEffect(() => {
    filterListUpdate(label, filterList);
  }, [filterList]);

  const accordionOpenHandler = () => {
    if (isOpened) {
      return setOpenFilterLabel(null);
    }
    return setOpenFilterLabel(label);
  };

  const selectList = filterPreview(label, filterList);

  return (
    <div>
      <div
        className={`flex flex-col whitespace-nowrap px-5 ${
          isOpened ? 'mb-5' : ''
        }`}
      >
        <div className="flex h-[4.8rem] items-center justify-between">
          <button
            onClick={accordionOpenHandler}
            className="mr-4 flex items-center"
          >
            <p className="text-lg font-semibold">{label}</p>
            {isOpened ? (
              <ArrowUpSVG className="h-[34px] w-[34px] fill-black" />
            ) : (
              <ArrowDownSVG className="h-[34px] w-[34px] fill-black" />
            )}
          </button>
          {isOpened ? (
            <ResetButton onClick={onReset}>초기화</ResetButton>
          ) : (
            <div className="flex-grow truncate text-right text-gray-300">
              {selectList}
            </div>
          )}
        </div>
        <Accordion isOpen={isOpened}>{children}</Accordion>
      </div>
      <hr className="border border-solid border-gray-900" />
    </div>
  );
};

export default FilterAccordion;

const filterPreview = (
  label: string,
  filter:
    | Regions
    | string[]
    | number
    | number[]
    | (string | undefined)[]
    | string
    | DayTimeFilterOption,
) => {
  switch (label) {
    case '지역': {
      const selectFilter = Object.entries(filter);

      return selectFilter.flatMap(
        ([region, subRegions]: [string, string[]], index) =>
          region +
          (WARD_LIST[region].length === subRegions.length
            ? index !== selectFilter.length - 1
              ? ' 전 지역, '
              : ' 전 지역'
            : subRegions.reduce(
                (acc, region, index) =>
                  (acc +=
                    index !== subRegions.length - 1
                      ? ` ${region},`
                      : ` ${region}`),
                '',
              )),
      );
    }
    case '장르': {
      const genreList = filter as string[];
      return genreList.length > 0 ? genreList.join(', ') : '전체';
    }
    case '평점': {
      const star = filter as number;
      return star > 0 ? `${star} 이상` : '';
    }
    case '가격': {
      const [min, max] = filter as number[];
      if (min === PRICE_FILTER_MIN && max !== PRICE_FILTER_MAX) {
        return `~ ${max.toLocaleString()}원`;
      } else if (min !== 0 && max !== 0) {
        return `${min.toLocaleString()}원 ~ ${max.toLocaleString()}원`;
      } else {
        return '';
      }
    }
    case '지정날짜': {
      const [gteDate, lteDate] = filter as [
        string | undefined,
        string | undefined,
      ];
      if (gteDate && lteDate) {
        return `${gteDate} ~ ${lteDate}`;
      } else {
        return gteDate;
      }
    }
    case '인원': {
      const group = filter as string;
      return group;
    }
    case '진행 방식': {
      const method = filter as string;
      return method;
    }
    case '요일/시간대': {
      const { week, time } = filter as DayTimeFilterOption;

      return [...week, ...time.map((time) => time.split('(')[0])].join(', ');
    }
  }
};

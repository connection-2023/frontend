'use client';
import { useState, useEffect } from 'react';
import DateFilter from './DateFilter';
import DayTimeFilter from './DayTimeFilter';
import GenreFilter from './GenreFilter';
import LocationFilter from './LocationFilter';
import PriceFilter from './PriceFilter';
import ProgressMethodFilter from './ProgressMethodFilter';
import ReviewFilter from './ReviewFilter';
import { Button } from '../Button/Button';
import { CloseSVG } from '../../../public/icons/svg';
import { IFilterOptions } from '@/types/types';
import { WARD_LIST } from '../../constants/administrativeDistrict';

const INIT_FILTER_OPTIONS: IFilterOptions = {
  location: {},
  genre: [],
  review: 0,
  price: [],
  date: [],
  method: [],
  daytime: [],
};

const Filters = ({ type }: { type: string }) => {
  const [filterOption, setFilterOption] = useState(INIT_FILTER_OPTIONS);
  const [options, setOptions] = useState<{ type: string; value: string }[]>([]);

  useEffect(() => {
    if (filterOption) {
      const values = Object.entries(filterOption).reduce<
        { type: string; value: any }[]
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
            acc.push({ type: key, value: value.join(', ') });
          } else {
            acc.push(...value.map((v) => ({ type: key, value: v })));
          }
        } else if (typeof value === 'object') {
          // location일 경우
          for (const city in value) {
            const allWards = WARD_LIST[city].length;
            if (value[city].length === allWards) {
              acc.push({ type: key, value: `${city} > 전지역` });
            } else {
              for (const district of value[city]) {
                // "도시명 > 구명" 형태로 추가
                acc.push({ type: key, value: `${city} > ${district}` });
              }
            }
          }
        } else {
          acc.push({ type: key, value });
        }

        return acc;
      }, []);

      setOptions(values);
    }
  }, [filterOption]);

  const updateFilterOption = (label: string, option: any) => {
    const updateFunction = (key: string, value: any) => {
      setFilterOption((prev) => ({ ...prev, [key]: value }));
    };

    switch (label) {
      case '지역':
        updateFunction('location', option);
        break;
      case '장르':
        updateFunction('genre', option);
        setOptions((prev) => [...prev, ...option]);
        break;
      case '평점':
        updateFunction('review', option);
        break;
      case '가격':
        updateFunction('price', option);
        break;
      case '지정날짜':
        updateFunction('date', option);
        break;
      case '진행방식':
        updateFunction('method', option);
        break;
      case '시간':
        updateFunction('daytime', option);
        break;
    }
  };

  const filterComponents = [
    <LocationFilter
      filterOption={filterOption.location}
      updateFilterOption={updateFilterOption}
      key="location"
    />,
    <GenreFilter
      filterOption={filterOption.genre}
      updateFilterOption={updateFilterOption}
      key="genre"
    />,
    <ReviewFilter
      filterOption={filterOption.review}
      updateFilterOption={updateFilterOption}
      key="review"
    />,
    <PriceFilter
      filterOption={filterOption.price}
      updateFilterOption={updateFilterOption}
      key="price"
    />,
    <ProgressMethodFilter
      filterOption={filterOption.method}
      updateFilterOption={updateFilterOption}
      key="method"
    />,
    <DayTimeFilter
      filterOption={filterOption.daytime}
      updateFilterOption={updateFilterOption}
      key="daytime"
    />,
    <DateFilter
      filterOption={filterOption.date}
      updateFilterOption={updateFilterOption}
      key="date"
    />,
  ];

  const onClickDelete = (optionToRemove: { type: string; value: string }) => {
    // options 업데이트
    const newOptions = options.filter(
      (option) =>
        option.value !== optionToRemove.value ||
        option.type !== optionToRemove.type,
    );
    setOptions(newOptions);

    // filterOption 업데이트
    const updatedFilterOption = { ...filterOption };

    switch (optionToRemove.type) {
      case 'location':
        const [city, district] = optionToRemove.value.split(' > ');
        if (district === '전지역') {
          const { [city]: _, ...rest } = updatedFilterOption.location;
          updatedFilterOption.location = rest;
        } else {
          updatedFilterOption.location[city] = updatedFilterOption.location[
            city
          ].filter((d) => d !== district);

          if (updatedFilterOption.location[city].length === 0) {
            delete updatedFilterOption.location[city];
          }
        }
        break;
      case 'genre':
        updatedFilterOption.genre = updatedFilterOption.genre.filter(
          (value) => value !== optionToRemove.value,
        );
        break;
      case 'review':
        updatedFilterOption.review = 0;
        break;
      case 'price':
        updatedFilterOption.price = [];
        break;
      case 'date':
        updatedFilterOption.date = updatedFilterOption.date.filter(
          (value) => value !== optionToRemove.value,
        );
        break;
      case 'method':
        updatedFilterOption.method = updatedFilterOption.method.filter(
          (value) => value !== optionToRemove.value,
        );
        break;
      case 'daytime':
        updatedFilterOption.daytime = updatedFilterOption.daytime.filter(
          (value) => value !== optionToRemove.value,
        );
        break;
      default:
        break;
    }

    setFilterOption(updatedFilterOption);
  };

  const onClickReset = () => {
    setOptions([]);
    setFilterOption(INIT_FILTER_OPTIONS);
  };

  return (
    <>
      <div className="mb-3 flex w-full flex-wrap items-center gap-2">
        {filterComponents.map((filter) => filter)}
        <Button mode="reset" onClick={onClickReset}>
          <span className="text-sm font-bold">초기화</span>
        </Button>
      </div>
      <ul className="flex w-full flex-wrap gap-x-5 gap-y-1">
        {options.map((option) => (
          <OptionList
            key={`${option.type}-${option.value}`}
            option={option}
            onClickDelete={onClickDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default Filters;

const OptionList = ({
  option,
  onClickDelete,
}: {
  option: { type: string; value: string };
  onClickDelete: (value: { type: string; value: string }) => void;
}) => {
  const displayValue = calculateDisplayValue(option);

  return option.type && displayValue ? (
    <li className="flex items-center text-sm font-medium">
      {`${displayValue}`}
      <CloseSVG
        width={14}
        height={14}
        className="ml-1 cursor-pointer stroke-sub-color1 stroke-2"
        onClick={() => onClickDelete(option)}
      />
    </li>
  ) : null;
};

const calculateDisplayValue = (option: { type: string; value: string }) => {
  if (option.type === 'price') {
    const values = option.value.split(', ').map(Number);
    if (values.length < 2) {
      return '';
    } else {
      const [min, max] = values;
      if (min === 0 && max !== 0) {
        return `~ ${max.toLocaleString()}원`;
      } else if (min !== 0 && max !== 0) {
        return `${min.toLocaleString()}원 ~ ${max.toLocaleString()}원`;
      } else {
        return '';
      }
    }
  } else if (option.type === 'review') {
    return `${option.value}.0 이상`;
  } else {
    return option.value;
  }
};

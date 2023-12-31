import { CloseSVG } from '@/icons/svg';
import DateFilter from './DateFilter';
import DayTimeFilter from './DayTimeFilter';
import GenreFilter from './GenreFilter';
import LocationFilter from './LocationFilter';
import OptionList from './OptionList';
import PriceFilter from './PriceFilter';
import ProgressMethodFilter from './ProgressMethodFilter';
import ReviewFilter from './ReviewFilter';
import { WARD_LIST } from '../../constants/administrativeDistrict';
import ResetButton from '../Button/ResetButton';
import { IFilterOptions } from '@/types/types';

interface FiltersProps {
  type: 'instructor' | 'class';
  filterOption: IFilterOptions;
}

const Filters = async ({ type, filterOption }: FiltersProps) => {
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
        acc.push({ type: key, value: value.join(', ') });
      } else {
        acc.push(...value.map((v) => ({ type: key, value: v })));
      }
    } else if (typeof value === 'object') {
      // location일 경우
      for (const city in value) {
        if (!WARD_LIST[city]) {
          return acc;
        }
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

  const filterComponents =
    type === 'class'
      ? [
          <LocationFilter filterOption={filterOption.regions} />,
          // <GenreFilter filterOption={filterOption.genre} key="genre" />,
          // <ReviewFilter filterOption={filterOption.review} key="review" />,
          // <PriceFilter filterOption={filterOption.price} key="price" />,
          // <ProgressMethodFilter
          //   filterOption={filterOption.method}
          //   key="method"
          // />,
          // <DayTimeFilter filterOption={filterOption.daytime} key="daytime" />,
          // <DateFilter filterOption={filterOption.date} key="date" />,
        ]
      : [
          <LocationFilter filterOption={filterOption.regions} key="location" />,
          // <GenreFilter filterOption={filterOption.genre} key="genre" />,
          // <ReviewFilter filterOption={filterOption.review} key="review" />,
        ];

  //   const [options, setOptions] = useState<{ type: string; value: string }[]>([]);
  //   useEffect(() => {

  //       setOptions(values);
  //     }
  //   }, [filterOption]);

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
      <div className="mb-3 flex w-full flex-wrap items-center gap-2">
        {filterComponents.map((filter) => filter)}
        <ResetButton>
          <span className="text-sm font-bold">초기화</span>
        </ResetButton>
      </div>
    </>
  );
};

export default Filters;
// const updateFilterOption = (
//   label: string,
//   option:
//     | IFilterOptions['review']
//     | IFilterOptions['price']
//     | IFilterOptions['date']
//     | Regions,
// ) => {
//   const updateFunction = (
//     key: string,
//     value:
//       | IFilterOptions['review']
//       | IFilterOptions['price']
//       | IFilterOptions['date']
//       | Regions,
//   ) => {
//     setFilterOption((prev) => ({ ...prev, [key]: value }));
//   };

//   switch (label) {
//     case '지역':
//       updateFunction('location', option);
//       break;
//     case '장르':
//       updateFunction('genre', option);

//       setOptions((prev) => [
//         ...prev,
//         ...(Array.isArray(option)
//           ? option.map((item) => ({ type: '장르', value: item.toString() }))
//           : [{ type: '장르', value: option.toString() }]),
//       ]);

//       break;
//     case '평점':
//       updateFunction('review', option);
//       break;
//     case '가격':
//       updateFunction('price', option);
//       break;
//     case '지정날짜':
//       updateFunction('date', option);
//       break;
//     case '진행방식':
//       updateFunction('method', option);
//       break;
//     case '시간':
//       updateFunction('daytime', option);
//       break;
//   }
// };

// const onClickDelete = (optionToRemove: { type: string; value: string }) => {
//   // options 업데이트
//   const newOptions = options.filter(
//     (option) =>
//       option.value !== optionToRemove.value ||
//       option.type !== optionToRemove.type,
//   );
//   setOptions(newOptions);

//   // filterOption 업데이트
//   const updatedFilterOption = { ...filterOption };

//   switch (optionToRemove.type) {
//     case 'location':
//       const [city, district] = optionToRemove.value.split(' > ');
//       if (district === '전지역') {
//         const { [city]: _, ...rest } = updatedFilterOption.location;
//         updatedFilterOption.location = rest;
//       } else {
//         updatedFilterOption.location[city] = updatedFilterOption.location[
//           city
//         ].filter((d) => d !== district);

//         if (updatedFilterOption.location[city].length === 0) {
//           delete updatedFilterOption.location[city];
//         }
//       }
//       break;
//     case 'genre':
//       updatedFilterOption.genre = updatedFilterOption.genre.filter(
//         (value) => value !== optionToRemove.value,
//       );
//       break;
//     case 'review':
//       updatedFilterOption.review = 0;
//       break;
//     case 'price':
//       updatedFilterOption.price = [];
//       break;
//     case 'date':
//       updatedFilterOption.date = updatedFilterOption.date.filter(
//         (value) => value !== optionToRemove.value,
//       );
//       break;
//     case 'method':
//       updatedFilterOption.method = updatedFilterOption.method.filter(
//         (value) => value !== optionToRemove.value,
//       );
//       break;
//     case 'daytime':
//       updatedFilterOption.daytime = updatedFilterOption.daytime.filter(
//         (value) => value !== optionToRemove.value,
//       );
//       break;
//     default:
//       break;
//   }

//   setFilterOption(updatedFilterOption);
// };

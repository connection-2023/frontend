import { CITY_LIST } from '@/constants/administrativeDistrict';

const selectCityStyle = (
  focusLocation: string | null,
  city: string,
  selectLocationList: Record<string, string[]> | null,
) => {
  return focusLocation === city ||
    (selectLocationList &&
      selectLocationList[city] &&
      selectLocationList[city].length > 0)
    ? 'select-shadow-border bg-[#F5F5F5] font-bold flex h-[2.8125rem] sm:h-7 w-[25%] sm:w-[11.11%] cursor-pointer items-center justify-center'
    : 'shadow-border text-gray-300 flex h-[2.8125rem] sm:h-7 w-[25%] sm:w-[11.11%] cursor-pointer items-center justify-center';
};

interface CityListProps {
  focusLocation: string | null;
  selectLocationList: Record<string, string[]>;
  focusLocationHandler: (city: string) => void;
}

const CityList = ({
  focusLocation,
  selectLocationList,
  focusLocationHandler,
}: CityListProps) => {
  return (
    <ul className="flex flex-wrap">
      {CITY_LIST.map((city) => (
        <li
          key={city}
          className={selectCityStyle(focusLocation, city, selectLocationList)}
          onClick={() => focusLocationHandler(city)}
        >
          {city}
        </li>
      ))}
    </ul>
  );
};

export default CityList;

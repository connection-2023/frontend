import { CITY_LIST, WARD_LIST } from '@/constants/administrativeDistrict';
import { Regions } from '@/types/instructor';
import { CityList } from '@/types/types';

interface LocationFilterProps {
  filterList: Regions;
  selectedCity: CityList;
  changeSelectedCity: (city: CityList) => void;
  changeFilterList: (ward: string) => void;
  changeCheckBox: (
    event: React.ChangeEvent<HTMLInputElement>,
    city: CityList,
  ) => void;
}

const LocationFilter = ({
  filterList,
  selectedCity,
  changeSelectedCity,
  changeFilterList,
  changeCheckBox,
}: LocationFilterProps) => {
  return (
    <div className="mb-3 flex max-h-[19.6rem] select-none text-sm sm:mb-0 sm:max-h-[17rem] sm:w-[16.8rem]">
      <ul className="flex w-4/12 flex-col overflow-y-auto pt-1 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1">
        {CITY_LIST.map((city) => (
          <li
            key={city}
            className={`flex w-full cursor-pointer items-center  gap-2 whitespace-nowrap px-2 py-2  ${
              city === selectedCity && 'bg-gray-700'
            } ${filterList[city] && 'font font-bold text-sub-color1'}`}
            onClick={() => changeSelectedCity(city)}
          >
            <input
              type="checkbox"
              className="h-[1.12rem] w-[1.12rem] accent-sub-color1"
              checked={
                (filterList[city] || []).length === WARD_LIST[city].length
              }
              onChange={(event) => changeCheckBox(event, city)}
            />
            {city}
          </li>
        ))}
      </ul>
      <ul className="flex w-8/12 flex-wrap content-start overflow-y-auto px-3 pt-3 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1">
        {WARD_LIST[selectedCity].map((ward) => (
          <li
            key={ward}
            className={`mb-4 basis-1/2 cursor-pointer pl-2 align-middle ${
              filterList[selectedCity]?.includes(ward) &&
              'font font-bold text-sub-color1'
            }`}
            onClick={() => changeFilterList(ward)}
          >
            {ward}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationFilter;

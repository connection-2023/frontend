'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { REGIONS_SELECT_MAX } from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import {
  CITY_CODE,
  CITY_LIST,
  WARD_CODE,
  WARD_LIST,
} from '../../constants/administrativeDistrict';
import { Regions } from '@/types/instructor';
import { CityList } from '@/types/locationFilter';

interface ILocationFilterProps {
  filterOption: {};
}

const LocationFilter = ({ filterOption }: ILocationFilterProps) => {
  const [selectedCity, setSelectedCity] = useState<CityList>('서울');
  const [filterList, setFilterList] = useState<Regions>(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '지역';

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const changeFilterList = (ward: string) => {
    const currentWards = filterList[selectedCity] || [];
    const isWardSelected = currentWards.includes(ward);

    let changeList: Regions = {};

    if (isWardSelected) {
      if (currentWards.length === 1) {
        deleteFilterCity(selectedCity);
        return;
      } else {
        changeList = {
          ...filterList,
          [selectedCity]: currentWards.filter(
            (currentWard) => currentWard !== ward,
          ),
        };
      }
    } else {
      changeList = {
        ...filterList,
        [selectedCity]: [...currentWards, ward],
      };
    }

    const selectLength = countSelectList(changeList);

    if (selectLength > REGIONS_SELECT_MAX) {
      toast.error(`지역은 ${REGIONS_SELECT_MAX}개까지 선택 가능합니다.`);
    } else {
      setFilterList({ ...changeList });
    }
  };

  const countSelectList = (list: Regions) => {
    let selectCount = 0;

    Object.entries(list).forEach(([key, wards]) => {
      if (WARD_LIST[key].length === wards.length) {
        selectCount++;
      } else {
        selectCount += wards.length;
      }
    });

    return selectCount;
  };

  const changeCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    city: CityList,
  ) => {
    if (event.target.checked) {
      let changeList: Regions = {};

      changeList = {
        ...filterList,
        [city]: [...WARD_LIST[city]],
      };

      const selectLength = countSelectList(changeList);

      if (selectLength > REGIONS_SELECT_MAX) {
        toast.error(`지역은 ${REGIONS_SELECT_MAX}개까지 선택 가능합니다.`);
      } else {
        setFilterList({ ...changeList });
      }
    } else {
      deleteFilterCity(city);
    }
  };

  const deleteFilterCity = (city: CityList) => {
    const newFilterList = { ...filterList };
    delete newFilterList[city];

    setFilterList(newFilterList);
  };

  const onReset = () => {
    setFilterList({});
  };

  const onApply = () => {
    const regionsCode = Object.entries(filterList)
      .flatMap(([city, wards]) => {
        const cityCode = CITY_CODE[city];
        return (
          cityCode +
          '_' +
          (wards.length === WARD_LIST[city].length
            ? '1'
            : wards.map((ward) => WARD_CODE[cityCode][ward]).join('%'))
        );
      })
      .join(',');

    changeParams({ name: 'regions', value: regionsCode });
  };

  const onClose = () => {
    setSelectedCity('서울');
    setFilterList(filterOption);
  };

  return (
    <FilterModal
      label={label}
      onClose={onClose}
      onReset={onReset}
      onApply={onApply}
    >
      <div className="flex max-h-[17rem] w-[16.8rem] select-none text-sm">
        <ul className="flex w-4/12 flex-col overflow-y-auto pt-1 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1">
          {CITY_LIST.map((city) => (
            <li
              key={city}
              className={`flex w-full cursor-pointer items-center  gap-2 whitespace-nowrap px-2 py-2  ${
                city === selectedCity && 'bg-gray-700'
              } ${filterList[city] && 'font font-bold text-sub-color1'}`}
              onClick={() => setSelectedCity(city)}
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
    </FilterModal>
  );
};

export default LocationFilter;

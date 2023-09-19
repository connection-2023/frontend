'use client';
import { CITY_LIST, WARD_LIST } from '../../constants/administrativeDistrict';
import { CityList, LocationFilterList } from '@/types/locationFilter';
import React, { useState } from 'react';

const LocationFilter = () => {
  const [selectedCity, setSelectedCity] = useState<CityList>('서울');
  const [filterList, setFilterList] = useState<LocationFilterList>({});

  const changeFilterList = (ward: string) => {
    const currentWards = filterList[selectedCity] || [];
    const isWardSelected = currentWards.includes(ward);

    if (isWardSelected) {
      if (currentWards.length === 1) {
        deleteFilterCity(selectedCity);
      } else {
        setFilterList({
          ...filterList,
          [selectedCity]: currentWards.filter(
            (currentWard) => currentWard !== ward,
          ),
        });
      }
    } else {
      setFilterList({
        ...filterList,
        [selectedCity]: [...currentWards, ward],
      });
    }
  };

  const changeCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    city: CityList,
  ) => {
    if (event.target.checked) {
      setFilterList({
        ...filterList,
        [city]: [...WARD_LIST[city]],
      });
    } else {
      deleteFilterCity(city);
    }
  };

  const deleteFilterCity = (city: CityList) => {
    const newFilterList = { ...filterList };
    delete newFilterList[city];
    setFilterList(newFilterList);
  };

  return (
    <div className="flex max-h-[17rem] w-[16.8rem] select-none text-sm">
      <ul className="scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-[#B6B6B6] scrollbar-thumb-rounded-lg scrollbar-w-1 flex w-4/12 flex-col  overflow-y-auto pt-1">
        {CITY_LIST.map((city) => (
          <li
            key={city}
            className={`flex w-full cursor-pointer items-center  gap-2 whitespace-nowrap px-2 py-2  ${
              city === selectedCity && 'bg-[#D9D9D9]'
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
      <ul className="scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-[#B6B6B6] scrollbar-thumb-rounded-lg scrollbar-w-1 flex w-8/12 flex-wrap content-start overflow-y-auto px-3 pt-3">
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

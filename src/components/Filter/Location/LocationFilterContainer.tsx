'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { REGIONS_SELECT_MAX } from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store/filterStore';
import LocationFilter from './LocationFilter';
import LocationSelectView from './LocationSelectView';
import {
  CITY_CODE,
  WARD_CODE,
  WARD_LIST,
} from '../../../constants/administrativeDistrict';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';
import { Regions } from '@/types/instructor';
import { CityList } from '@/types/types';

interface ILocationFilterContainerProps {
  filterOption: {};
}

const LocationFilterContainer = ({
  filterOption,
}: ILocationFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore();
  const [selectedCity, setSelectedCity] = useState<CityList>('서울');
  const [filterList, setFilterList] = useState<Regions>(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '지역';

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const changeSelectedCity = (city: CityList) => {
    setSelectedCity(city);
  };

  const changeFilterList = (ward: string, city?: CityList) => {
    const currentWards = filterList[city ?? selectedCity] || [];
    const isWardSelected = currentWards.includes(ward);

    let changeList: Regions = {};

    if (isWardSelected) {
      if (currentWards.length === 1) {
        deleteFilterCity(city ?? selectedCity);
        return;
      } else {
        changeList = {
          ...filterList,
          [city ?? selectedCity]: currentWards.filter(
            (currentWard) => currentWard !== ward,
          ),
        };
      }
    } else {
      changeList = {
        ...filterList,
        [city ?? selectedCity]: [...currentWards, ward],
      };
    }

    const selectLength = countSelectList(changeList);

    if (selectLength > REGIONS_SELECT_MAX) {
      toast.error(`지역은 ${REGIONS_SELECT_MAX}개까지 선택 가능합니다.`);
    } else {
      for (let [city, ward] of Object.entries(changeList)) {
        if (WARD_LIST[city].length !== ward.length) {
          return setFilterList({ ...changeList });
        }
      }

      return setFilterList({});
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
        setFilterList(
          Object.keys(changeList).length === Object.keys(WARD_LIST).length
            ? {}
            : { ...changeList },
        );
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
    changeSelectedCity('서울');
    setFilterList(filterOption);
  };
  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={filterList} onReset={onReset}>
      <LocationFilter
        filterList={filterList}
        selectedCity={selectedCity}
        changeSelectedCity={changeSelectedCity}
        changeFilterList={changeFilterList}
        changeCheckBox={changeCheckBox}
      />
      <LocationSelectView
        filterList={filterList}
        deleteFilterCity={deleteFilterCity}
        changeFilterList={changeFilterList}
      />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onClose={onClose}
      onReset={onReset}
      onApply={onApply}
    >
      <LocationFilter
        filterList={filterList}
        selectedCity={selectedCity}
        changeSelectedCity={changeSelectedCity}
        changeFilterList={changeFilterList}
        changeCheckBox={changeCheckBox}
      />
    </FilterModal>
  );
};

export default LocationFilterContainer;

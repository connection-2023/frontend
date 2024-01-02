import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  CITY_CODE,
  LOCATION_CODE,
  WARD_CODE,
} from '@/constants/administrativeDistrict';

export const regionsDecryption = (regionsCode: string | undefined) => {
  if (!regionsCode || typeof regionsCode !== 'string') {
    return [];
  }

  return regionsCode
    .split(',')
    .flatMap((regionCode) => {
      const [cityCode, wardCodes] = regionCode.split('_');
      if (!LOCATION_CODE[cityCode]) {
        return [];
      }
      return wardCodes.split('%').map((wardCode) => {
        if (!LOCATION_CODE[cityCode][wardCode]) {
          return 'undefined';
        }
        return LOCATION_CODE[cityCode][wardCode];
      });
    })
    .filter((region) => region !== 'undefined');
};

const removeRegionFromSearchParams = (region: string, searchParams: string) => {
  const [city, ward] = region.split(' > ');

  const cityCodeToRemove = CITY_CODE[city];
  const wardCodeToRemove = String(WARD_CODE[cityCodeToRemove][ward]);
  const regionList = searchParams.split(',');

  const updatedSearchParams = regionList.reduce(
    (accumulatedParams, currentRegion, index) => {
      const [currentCityCode, wardCodes] = currentRegion.split('_');

      if (currentCityCode === cityCodeToRemove) {
        const updatedWardCodes = wardCodes
          .split('%')
          .filter((wardCode) => wardCode !== wardCodeToRemove)
          .join('%');

        if (updatedWardCodes) {
          accumulatedParams += `${currentCityCode}_${updatedWardCodes}${
            index === regionList.length - 1 ? '' : ','
          }`;
        }
      } else {
        accumulatedParams += `${currentCityCode}_${wardCodes}${
          index === regionList.length - 1 ? '' : ','
        }`;
      }

      return accumulatedParams;
    },
    '',
  );

  return updatedSearchParams;
};

interface OnClickDelete {
  type: string;
  value: string;
  changeParams: ({
    name,
    value,
  }: {
    name: string;
    value: string | string[];
  }) => void;
  searchParams: ReadonlyURLSearchParams;
}

export const onClickDelete = ({
  type,
  value,
  changeParams,
  searchParams,
}: OnClickDelete) => {
  switch (type) {
    case 'regions':
      const changeValue = removeRegionFromSearchParams(
        value,
        searchParams.get('regions')!,
      );
      changeParams({ name: 'regions', value: changeValue });
      break;
    // case 'genre':
    //   updatedFilterOption.genre = updatedFilterOption.genre.filter(
    //     (value) => value !== optionToRemove.value,
    //   );
    //   break;
    // case 'review':
    //   updatedFilterOption.review = 0;
    //   break;
    // case 'price':
    //   updatedFilterOption.price = [];
    //   break;
    // case 'date':
    //   updatedFilterOption.date = updatedFilterOption.date.filter(
    //     (value) => value !== optionToRemove.value,
    //   );
    //   break;
    // case 'method':
    //   updatedFilterOption.method = updatedFilterOption.method.filter(
    //     (value) => value !== optionToRemove.value,
    //   );
    //   break;
    // case 'daytime':
    //   updatedFilterOption.daytime = updatedFilterOption.daytime.filter(
    //     (value) => value !== optionToRemove.value,
    //   );
    //   break;
    // default:
    //   break;
  }
};

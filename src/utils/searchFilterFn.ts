import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  CITY_CODE,
  LOCATION_CODE,
  WARD_CODE,
} from '@/constants/administrativeDistrict';
import { FILTER_TIME } from '@/constants/constants';

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
  changeMultipleParams: (
    paramsArray: {
      name: string;
      value: string | string[];
    }[],
  ) => void;
  searchParams: ReadonlyURLSearchParams;
}

export const onClickDelete = ({
  type,
  value,
  changeParams,
  changeMultipleParams,
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
    case 'genre':
      changeParams({
        name: 'genre',
        value: searchParams.getAll('genre').filter((genre) => genre !== value),
      });
      break;
    case 'review':
      changeParams({
        name: 'stars',
        value: '',
      });
      break;
    case 'price':
      changeMultipleParams([
        { name: 'gtePrice', value: '' },
        { name: 'ltePrice', value: '' },
      ]);
      break;
    case 'date':
      changeMultipleParams([
        { name: 'gteDate', value: '' },
        { name: 'lteDate', value: '' },
      ]);
      break;
    case 'group':
      changeParams({
        name: 'group',
        value: '',
      });
      break;
    case 'method':
      changeParams({
        name: 'method',
        value: '',
      });
      break;
    case 'week':
      changeParams({
        name: 'days',
        value: searchParams.getAll('days').filter((week) => week !== value),
      });
      break;
    case 'time':
      changeParams({
        name: 'timeOfDay',
        value: searchParams
          .getAll('timeOfDay')
          .filter(
            (time) =>
              FILTER_TIME.find(({ value }) => value === time)?.label !== value,
          ),
      });
      break;
    default:
      break;
  }
};

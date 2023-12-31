import { LOCATION_CODE } from '@/constants/administrativeDistrict';

export const regionsDecryption = (regionsCode: string | undefined) => {
  if (!regionsCode) {
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

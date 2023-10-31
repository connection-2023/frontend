import { CITY_FULL_NAME, WARD_LIST } from '@/constants/administrativeDistrict';
import { DANCE_GENRE } from '@/constants/constants';
import { postMultipleImage } from '@/lib/apis/imageApi';

export const handleImageUpload = async (profileImageUrls: any[]) => {
  const imgFileList = profileImageUrls.map(({ file }) => file);
  return await postMultipleImage(imgFileList, 'instructor');
};

export const constructEmail = (emailFront: string, emailBack: string) => {
  return emailFront + '@' + emailBack;
};

export const categorizeGenres = (genres: string[]) => {
  return genres.reduce(
    (acc, genre) => {
      if (DANCE_GENRE.includes(genre)) {
        acc.newGenres.push(genre);
      } else {
        acc.etcGenres.push(genre);
      }
      return acc;
    },
    { newGenres: [] as string[], etcGenres: [] as string[] },
  );
};

export const formatRegions = (regions: { [key: string]: string[] }) => {
  return Object.entries(regions).flatMap(([key, value]) => {
    const valArray = value as string[]; // 타입 단언 사용
    if (key === '온라인' || key === '세종') {
      return [key === '세종' ? '세종특별자치시' : '온라인'];
    } else if (valArray.length === WARD_LIST[key].length) {
      return [`${CITY_FULL_NAME[key]} 전 지역`];
    } else {
      return valArray.map((val) => `${CITY_FULL_NAME[key]} ${val}`);
    }
  });
};

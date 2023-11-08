import {
  CITY_ABBREVIATION_NAME,
  CITY_FULL_NAME,
  WARD_LIST,
} from '@/constants/administrativeDistrict';
import { DANCE_GENRE } from '@/constants/constants';
import { deleteImage, postMultipleImage } from '@/lib/apis/imageApi';
import { classCreateData } from '@/types/class';

export const handleImageUpload = async (
  profileImageUrls: any[],
  mode: 'lecturers' | 'lectures',
) => {
  const imgFileList = profileImageUrls.map(({ file }) => file);
  return await postMultipleImage(imgFileList, mode);
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

export const reqRegions = (regions: { [key: string]: string[] }) => {
  return Object.entries(regions).flatMap(([key, value]) => {
    const valArray = value as string[];
    if (key === '온라인' || key === '세종') {
      return [key === '세종' ? '세종특별자치시' : '온라인'];
    } else if (valArray.length === WARD_LIST[key].length) {
      return [`${CITY_FULL_NAME[key]} 전 지역`];
    } else {
      return valArray.map((val) => `${CITY_FULL_NAME[key]} ${val}`);
    }
  });
};

export const resRegions = (
  regions: {
    administrativeDistrict: string;
    district: string | null;
  }[],
) => {
  const result: { [key: string]: string[] } = {};

  regions.forEach(({ administrativeDistrict, district }) => {
    const abbreviation = CITY_ABBREVIATION_NAME[administrativeDistrict];

    if (!abbreviation) return;

    if (!result[abbreviation]) {
      result[abbreviation] = [];
    }

    const newEntries =
      district === null || district === '전 지역'
        ? abbreviation === '온라인'
          ? ['온라인']
          : WARD_LIST[abbreviation]
        : [district];

    result[abbreviation] = [
      ...new Set([...result[abbreviation], ...newEntries]),
    ];
  });

  return result;
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const classOutputDataProcess = async (
  data: classCreateData,
  step: number,
) => {
  switch (step) {
    case 0:
      const {
        title,
        classSize,
        difficultyLevel,
        genres,
        lectureMethod,
        lessonType,
      } = data;
      const images = await handleImageUpload(data.images, 'lectures');

      const classLevel =
        difficultyLevel === '상급'
          ? '상'
          : difficultyLevel === '중급'
          ? '중'
          : '하';

      const newLectureMethod =
        lectureMethod === '원데이 레슨' ? '원데이' : '정기';

      const isGroup = lessonType === '그룹레슨';

      const minCapacity = isGroup ? classSize.min : undefined;

      const maxCapacity = isGroup ? classSize.max : undefined;

      const { newGenres, etcGenres } = categorizeGenres(genres);

      return {
        images,
        title,
        genres: newGenres,
        etcGenres,
        difficultyLevel: classLevel,
        lectureMethod: newLectureMethod,
        isGroup,
        minCapacity,
        maxCapacity,
      };

    case 1:
      const { notification, introduction, curriculum } = data;

      curriculum.deletedImages.forEach(
        async ({ src }) => await deleteImage({ imageUrl: src }),
      );

      if (curriculum.clear && curriculum.deletedImages.length > 0) {
        curriculum.clear();
      }

      return {
        notification,
        introduction,
        curriculum: curriculum.content,
      };
    case 2:
      const {
        holidays,
        classRange,
        duration,
        reservationComment,
        reservationDeadline,
      } = data;

      return {
        holidays,
        startDate: classRange.startDate,
        endDate: classRange.endDate,
        duration,
        reservationComment,
        reservationDeadline,
      };
      break;
    case 3:
      const {
        detail,
        address,
        locationConsultative,
        regions,
        locationDescription,
      } = data;

      const detailAddress = {
        detail,
        roadAddr: address?.roadAddr,
        bdNm: address?.bdNm,
      };

      console.log(reqRegions(regions));

      if (locationConsultative) {
        return {
          regions: reqRegions(regions),
          locationDescription,
          detailAddress: null,
        };
      }

    // return {};

    case 4:
      break;
  }
};

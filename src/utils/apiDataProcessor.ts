import { parseISO, format } from 'date-fns';
import {
  CITY_ABBREVIATION_NAME,
  CITY_FULL_NAME,
  WARD_LIST,
} from '@/constants/administrativeDistrict';
import { DANCE_GENRE } from '@/constants/constants';
import { createClass, getClassDraft } from '@/lib/apis/classApi';
import {
  deleteImage,
  postMultipleImage,
  postSingleImage,
} from '@/lib/apis/imageApi';
import { formatLocationToString } from '@/utils/parseUtils';
import { calculateFinalDates } from './parseUtils';
import { instructorProfile, userProfile, profileInfo } from '@/types/auth';
import {
  IprocessedDraft,
  classCreateData,
  IClassPostResponse,
  ClassCardType,
  searchClass,
  searchBestClassData,
  IGetClassDraft,
  IUpdateClassDraft,
  classProccessData,
} from '@/types/class';
import {
  CouponData,
  couponGET,
  createCouponData,
  updateCouponData,
  userCouponGET,
} from '@/types/coupon';
import { searchInstructor } from '@/types/instructor';

export const uploadImageFiles = async (
  profileImageUrls: {
    file: File;
    imageUrl: string;
  }[],
  mode: 'lecturers' | 'lectures',
) => {
  const imgFileList = profileImageUrls.map(({ file }) => file);
  return await postMultipleImage(imgFileList, mode);
};

export const uploadImageFilesWithFallback = async (
  profileImageUrls: {
    file?: File;
    imageUrl: string;
  }[],
  mode: 'lecturers' | 'lectures',
): Promise<string[]> => {
  const updatedUrls = await Promise.all(
    profileImageUrls.map(async ({ file, imageUrl }) => {
      if (file) {
        const newUrl = await postSingleImage(file, mode);
        return newUrl;
      } else {
        return imageUrl;
      }
    }),
  );

  return updatedUrls;
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
  regions:
    | {
        administrativeDistrict: string;
        district: string | null;
      }[]
    | undefined,
) => {
  if (!regions) return {};

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
        difficultyLevel,
        genres,
        lectureMethod,
        lessonType,
        min,
        max,
      } = data;

      const images = await uploadImageFilesWithFallback(
        data.images,
        'lectures',
      );

      const classLevel =
        difficultyLevel === '상급'
          ? '상'
          : difficultyLevel === '중급'
          ? '중'
          : '하';

      const newLectureMethod =
        lectureMethod === '원데이 레슨' ? '원데이' : '정기';

      const isGroup = lessonType === '그룹레슨';

      const minCapacity = isGroup ? min.value : undefined;

      const maxCapacity = isGroup ? max.value : undefined;

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
        schedules,
        reservationComment,
        reservationDeadline,
      } = data;

      return {
        holidays,
        startDate: classRange.startDate,
        endDate: classRange.endDate,
        duration,
        schedules,
        reservationComment,
        reservationDeadline,
      };
    case 3:
      const {
        detail,
        address,
        locationConsultative,
        regions,
        locationDescription,
      } = data;

      const location = {
        detailAddress: detail,
        address: address?.roadAddr,
        buildingName: address?.bdNm,
      };

      if (locationConsultative) {
        return {
          regions: reqRegions(regions),
          locationDescription,
          location: null,
        };
      }

      return {
        location,
        locationDescription,
        regions: [],
      };

    case 4:
      const { classPrice, max: priceMax, coupons } = data;

      return {
        maxCapacity: priceMax.value,
        price: classPrice,
        coupons: coupons.map(({ value }) => value.id),
      };
  }
};

export const classCreate = async (
  id: string,
  finalSchedule: Date[] | undefined,
) => {
  const { location, temporaryLecture, schedules } = await getClassDraft(id);
  const {
    temporaryLectureToRegion,
    lectureMethod,
    isGroup,
    startDate,
    endDate,
    temporaryLecturenotification,
    temporaryLectureToDanceGenre,
    temporaryLectureImage,
    title,
    introduction,
    curriculum,
    duration,
    difficultyLevel,
    maxCapacity,
    minCapacity,
    reservationDeadline,
    reservationComment,
    price,
    temporaryLectureHoliday,
    locationDescription,
    temporaryLectureCouponTarget,
  } = temporaryLecture;

  const allClassDates = finalSchedule
    ? finalSchedule
    : startDate &&
      endDate &&
      schedules &&
      temporaryLectureHoliday &&
      calculateFinalDates(
        startDate,
        endDate,
        schedules,
        temporaryLectureHoliday,
      );

  const isLocationConfirmed = temporaryLectureToRegion.length > 0;

  const { newGenres, etcGenres } = categorizeGenres(
    temporaryLectureToDanceGenre.map(
      ({ danceCategory }) => danceCategory.genre,
    ),
  );

  const images = temporaryLectureImage.map(({ imageUrl }) => imageUrl);

  const data = {
    regions: isLocationConfirmed
      ? temporaryLectureToRegion.map(
          ({ region }) => region.administrativeDistrict + ' ' + region.district,
        )
      : [],
    location: isLocationConfirmed
      ? null
      : {
          address: location?.address,
          detailAddress: location?.detailAddress,
          buildingName: location?.buildingName,
        },
    lectureType: 'dance',
    lectureMethod: lectureMethod?.name,
    isGroup,
    startDate,
    endDate,
    notification: temporaryLecturenotification.notification,
    genres: newGenres,
    etcGenres,
    images,
    title,
    introduction,
    curriculum,
    duration,
    difficultyLevel,
    maxCapacity,
    minCapacity,
    reservationDeadline,
    reservationComment,
    price,
    locationDescription,
    holidays: temporaryLectureHoliday.map(({ holiday }) => holiday),
    coupons: temporaryLectureCouponTarget.map(
      ({ lectureCouponId }) => lectureCouponId,
    ),
    schedules: allClassDates,
  };

  const newClassId = await createClass(data);
  return newClassId;
};

export const mapItemToCoupon = (item: userCouponGET | couponGET): couponGET => {
  if ('lectureCoupon' in item) {
    return {
      createdAt: new Date(),
      updatedAt: new Date(item.updatedAt),
      startAt: item.lectureCoupon.startAt,
      endAt: item.lectureCoupon.endAt,
      id: item.id,
      lectureCouponId: item.lectureCouponId,
      title: item.lectureCoupon.title,
      discountPrice: item.lectureCoupon.discountPrice,
      isDisabled: item.lectureCoupon.isDisabled,
      isPrivate: item.lectureCoupon.isPrivate,
      isStackable: item.lectureCoupon.isStackable,
      lectureCouponTarget: item.lectureCoupon.lectureCouponTarget,
      maxDiscountPrice: item.lectureCoupon.maxDiscountPrice,
      maxUsageCount: item.lectureCoupon.maxUsageCount ?? 0,
      percentage: item.lectureCoupon.percentage ?? 0,
    };
  } else {
    return item;
  }
};

export const transformToCardData = (
  data: IClassPostResponse[],
  lecturer: { nickname: string; img: string | null; id: number },
): ClassCardType[] =>
  data.map((item) => {
    const {
      id,
      title,
      price,
      isGroup,
      startDate,
      isLike,
      endDate,
      isActive,
      stars,
      reviewCount,
      lectureToRegion,
      lectureToDanceGenre,
      lectureImage,
    } = item;
    const date = `${format(parseISO(startDate), 'MM/dd')}~${format(
      parseISO(endDate),
      'MM/dd',
    )}`;
    const status = isActive ? '모집중' : '마감';
    const review = { average: stars, count: reviewCount };
    const type = isGroup ? '그룹레슨' : '개인레슨';
    const profile = {
      src: lecturer.img,
      nickname: lecturer.nickname,
      id: lecturer.id,
    };
    const location = formatLocationToString(lectureToRegion).split(', ');
    const genre = lectureToDanceGenre.map((genre) => genre.danceCategory.genre);
    const imgURL = lectureImage.map((img) => img.imageUrl);

    return {
      id,
      title,
      imgURL,
      isLiked: isLike,
      date,
      status,
      review,
      type,
      profile,
      price,
      location,
      genre,
    };
  });

export const transformSearchInstructor = (lecturers: searchInstructor[]) => {
  return lecturers.map(
    ({
      id,
      nickname,
      regions,
      genres,
      lecturerImages,
      stars,
      affiliation,
      isLiked,
      searchAfter,
    }) => ({
      id,
      searchAfter,
      isLiked,
      largeImg: false,
      name: nickname,
      teamAffiliation: affiliation,
      address: regions.map(
        ({ administrativeDistrict, district }) =>
          `${CITY_ABBREVIATION_NAME[administrativeDistrict]} ${district}`,
      ),
      genres: genres.map(({ genre }) => genre),
      imgURL: lecturerImages,
      average: stars,
      href: `instructor/${id}`,
    }),
  );
};

export const transformSearchClass = (classList: searchClass[]) => {
  return classList.map(
    ({
      id,
      title,
      startDate,
      endDate,
      lectureImages,
      regions,
      genres,
      reviewCount,
      isLiked,
      lectureMethod, // 원데이, 정기 표시 안하나?
      isGroup,
      stars,
      price,
      lecturer,
      isActive,
      searchAfter,
    }) => {
      let status: '모집중' | '마감';
      status = isActive ? '모집중' : '마감';

      return {
        id,
        title,
        date: `${format(parseISO(startDate), 'MM/dd')}~${format(
          parseISO(endDate),
          'MM/dd',
        )} `,
        status,
        imgURL: lectureImages,
        location: regions.map(
          ({ administrativeDistrict, district }) =>
            `${CITY_ABBREVIATION_NAME[administrativeDistrict]} ${district}`,
        ),
        genre: genres.map(({ genre }) => genre),
        type: isGroup ? '그룹레슨' : '개인레슨',
        review: { average: stars, count: reviewCount },
        price,
        profile: {
          src: lecturer.profileCardImageUrl,
          nickname: lecturer.nickname,
          id: lecturer.id,
        },
        isLiked: isLiked ? isLiked : false,
        searchAfter,
      };
    },
  );
};

export const transformSearchParamsLocation = (data: string[]) => {
  const result: { [key: string]: string[] } = {};

  data.forEach((item) => {
    const spaceIndex = item.indexOf(' ');
    const region = CITY_ABBREVIATION_NAME[item.substring(0, spaceIndex)];
    const subRegion = item.substring(spaceIndex + 1);

    if (!result[region]) {
      result[region] =
        subRegion === '전 지역' ? WARD_LIST[region] : [subRegion];
    } else {
      result[region].push(subRegion);
    }
  });

  return result;
};

export const transformBestClassSearch = (classList: searchBestClassData[]) => {
  return classList.map(
    ({
      id,
      title,
      startDate,
      endDate,
      lectureImage,
      lectureToRegion,
      lectureToDanceGenre,
      reviewCount,
      likedLecture,
      isActive,
      lectureMethod,
      isGroup,
      stars,
      price,
      lecturer,
    }) => {
      let status: '모집중' | '마감';
      status = isActive ? '모집중' : '마감';

      return {
        id,
        title,
        date: `${format(parseISO(startDate), 'MM/dd')}~${format(
          parseISO(endDate),
          'MM/dd',
        )} `,
        status,
        imgURL: lectureImage.map(({ imageUrl }) => imageUrl),
        location: lectureToRegion.map(({ region }) => {
          const { administrativeDistrict, district } = region;
          return `${CITY_ABBREVIATION_NAME[administrativeDistrict]} ${district}`;
        }),
        genre: lectureToDanceGenre.map(
          ({ danceCategory }) => danceCategory.genre,
        ),
        type: isGroup ? '그룹레슨' : '개인레슨',
        review: { average: stars, count: reviewCount },
        price,
        profile: {
          src: lecturer.profileCardImageUrl,
          nickname: lecturer.nickname,
          id: lecturer.id,
        },
        isLiked: likedLecture && likedLecture.length > 0 ? true : false,
      };
    },
  );
};

export const convertToProfileInfo = (
  profile: userProfile | instructorProfile,
): profileInfo => {
  let profileInfo = null;

  if ('users' in profile) {
    profileInfo = {
      id: profile.id,
      name: profile.users.name,
      nickname: profile.nickname,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      profileImage: profile.profileCardImageUrl || null,
      authEmail: profile.users.auth.email,
      type: profile.users.auth.type,
    };
  } else {
    profileInfo = {
      id: profile.id,
      name: profile.name,
      nickname: profile.nickname,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      profileImage: profile.userProfileImage?.imageUrl ?? null,
      authEmail: profile.auth.email,
      type: profile.auth.type,
    };
  }

  return profileInfo;
};

export const createCouponUtils = (
  data: CouponData,
  type: 'CREATE' | 'UPDATE',
): createCouponData | updateCouponData => {
  const {
    validityPeriod,
    couponQuantity,
    discountValue,
    maxUsageCount,
    couponDistributionCount,
    lectureIds,
    title,
    maxDiscountAmount,
    isPrivate,
    isStackable,
  } = data;

  const baseData = {
    title,
    endAt: new Date(validityPeriod.endDate),
    percentage: couponQuantity === '%' ? Number(discountValue) : undefined,
    discountPrice: couponQuantity === '원' ? Number(discountValue) : undefined,
    maxUsageCount: maxUsageCount ? undefined : Number(couponDistributionCount),
    isPrivate,
    isStackable,
    lectureIds: lectureIds.map(({ value }) => Number(value)),
    maxDiscountPrice: Number(maxDiscountAmount) ?? undefined,
  };

  if (type === 'CREATE') {
    return {
      ...baseData,
      startAt: new Date(validityPeriod.startDate),
    };
  } else {
    return baseData;
  }
};

export const classDraftsDataProcess = (
  data: IGetClassDraft,
): IprocessedDraft => {
  const {
    temporaryLectureToDanceGenre,
    isGroup,
    maxCapacity,
    minCapacity,
    difficultyLevel,
    lectureMethod,
    temporaryLecturenotification,
    startDate,
    endDate,
    temporaryLectureHoliday,
    reservationDeadline,
    temporaryLectureToRegion,
  } = data.temporaryLecture;

  const genres = temporaryLectureToDanceGenre.map((item) => {
    if (item.danceCategory.genre === '기타') {
      return item.name as string;
    }
    return item.danceCategory.genre;
  });

  const newDifficultyLevel =
    difficultyLevel === '상'
      ? '상급'
      : difficultyLevel === '중'
      ? '중급'
      : difficultyLevel === '하'
      ? '초급(입문)'
      : null;

  const newlectureMethod =
    lectureMethod?.name === '원데이'
      ? '원데이 레슨'
      : lectureMethod?.name === '정기'
      ? '정기클래스'
      : null;

  const lessonType =
    isGroup === null ? null : isGroup ? '그룹레슨' : '개인(1:1)레슨';

  const notification = temporaryLecturenotification?.notification;

  const newStartDate = startDate === null ? '' : formatDate(startDate);

  const newEndDate = endDate === null ? '' : formatDate(endDate);

  const holidays = temporaryLectureHoliday.map(
    ({ holiday }) => new Date(holiday),
  );

  const newReservationDeadline = Number(reservationDeadline);

  const regions = resRegions(
    temporaryLectureToRegion.map(({ region }) => region),
  );

  return {
    ...data.temporaryLecture,
    temporaryLectureToDanceGenre: genres,
    difficultyLevel: newDifficultyLevel,
    lectureMethod: newlectureMethod,
    lessonType,
    notification,
    classRange: {
      startDate: newStartDate,
      endDate: newEndDate,
    },
    holidays,
    reservationDeadline: newReservationDeadline,
    regions,
    min: minCapacity ?? 1,
    max: maxCapacity ?? 100,
    location: {
      roadAddr: data.location?.address,
      bdNm: data.location?.buildingName,
      detailAddress: data.location?.detailAddress,
    },
    schedules: data.schedules ? data.schedules : [],
    totalClasses: data.schedules?.length,
  };
};

export const formToClassDataProcess = (
  processData: classProccessData,
  data: classCreateData,
  currentStep: number,
) => {
  switch (currentStep) {
    case 0:
      const {
        images,
        title,
        genres,
        isGroup,
        etcGenres,
        lectureMethod,
        difficultyLevel,
        minCapacity,
        maxCapacity,
      } = processData;

      const temporaryLectureImage = images?.map((imageUrl) => ({
        imageUrl,
      }));

      const temporaryLectureToDanceGenre = [...genres!, ...etcGenres!];

      const lessonType = isGroup ? '그룹레슨' : '개인(1:1)레슨';

      const newlectureMethod =
        lectureMethod === '원데이'
          ? '원데이 레슨'
          : lectureMethod === '정기'
          ? '정기클래스'
          : null;

      const newDifficultyLevel =
        difficultyLevel === '상'
          ? '상급'
          : difficultyLevel === '중'
          ? '중급'
          : difficultyLevel === '하'
          ? '초급(입문)'
          : null;

      return {
        title,
        temporaryLectureImage,
        temporaryLectureToDanceGenre,
        lessonType,
        lectureMethod: newlectureMethod,
        difficultyLevel: newDifficultyLevel,
        min: minCapacity,
        max: maxCapacity,
      };
    case 1:
      const { notification, introduction, curriculum } = processData;

      return {
        notification,
        introduction,
        curriculum,
      };
    case 2:
      const {
        startDate,
        endDate,
        duration,
        schedules,
        holidays,
        reservationDeadline,
      } = processData;

      return {
        classRange: { startDate, endDate },
        duration,
        schedules,
        holidays,
        reservationDeadline,
      };
    case 3:
      const { location, locationDescription, regions } = processData;
      const { locationConsultative } = data;

      const regionsList: { [key: string]: string[] } = {};

      regions?.forEach((region) => {
        const [administrativeDistrict, district] = region.split(' ');
        const abbreviation = CITY_ABBREVIATION_NAME[administrativeDistrict];

        if (!abbreviation) return;

        if (!regionsList[abbreviation]) {
          regionsList[abbreviation] = [];
        }

        const newEntries =
          district === null || district === '전'
            ? abbreviation === '온라인'
              ? ['온라인']
              : WARD_LIST[abbreviation]
            : [district];

        regionsList[abbreviation] = [
          ...new Set([...regionsList[abbreviation], ...newEntries]),
        ];
      });

      return {
        location: locationConsultative
          ? undefined
          : {
              roadAddr: location?.address,
              bdNm: location?.buildingName,
              detailAddress: location?.detailAddress,
            },
        locationDescription,
        regions: locationConsultative ? regionsList : undefined,
      };
    case 4:
      const { maxCapacity: max, price } = processData;
      const { coupons } = data;

      return {
        max,
        price,
        coupons,
      };
  }
};

import { fileInfo } from 'suneditor/src/lib/core';
import { couponGET } from './coupon';
import { IRegion, IGenre } from './types';
import { Juso } from '@/types/address';

interface IInstructorProfile {
  id: number;
  profileCardImageUrl: null | string;
  nickname: string;
}

export interface IClassImageResponse {
  id: number;
  imageUrl: string;
}

export interface IClassGenreResponse {
  danceCategoryId: number;
  name: string | null;
  danceCategory: {
    id: number;
    genre: string;
  };
}

export interface IClassRegionResponse {
  region: {
    administrativeDistrict: string;
    district: string;
  };
}

export interface IClassNotification {
  id: number;
  lectureId: number;
  content: string;
  updatedAt: string;
  deletedAt: null;
}

export interface ClassCardType {
  id: number;
  status: '모집중' | '마감';
  date: string;
  title: string;
  imgURL: string[];
  location: string[];
  genre: string[];
  isLiked: boolean;
  type: string;
  review: { average: number; count: number };
  price: number;
  profile: { src: string | null; nickname: string };
  darkMode?: boolean;
  smallView?: boolean;
  searchAfter?: [number, number];
}

export interface Space {
  current: number;
  total: number;
}

export interface IDateTime {
  count: number;
  dateTime: string;
  lectureId?: number;
  lectureScheduleId: number;
  space: Space;
}

type day = '일' | '월' | '화' | '수' | '목' | '금' | '토';

export interface DayTimeList {
  day: day[];
  startDateTime: string[];
}

export interface DateTimeList {
  date: Date;
  startDateTime: string[];
}

export interface IGetClassDrafts {
  id: string;
  updatedAt: string;
  title: null | string;
  step: null | number;
}

export interface IGetClassDraft {
  temporaryLecture: {
    id: number;
    lecturerId: number;
    step: number | null;
    startDate?: string | null;
    endDate?: string | null;
    isGroup?: boolean | null;
    lectureTypeId?: number;
    lectureMethodId?: number;
    title?: string;
    introduction?: string;
    curriculum?: string;
    detailAddress?: string | null;
    duration?: number;
    difficultyLevel?: string;
    minCapacity?: number;
    maxCapacity?: number;
    locationDescription?: string;
    lectureMethod?: {
      name: string;
    } | null;
    reservationDeadline?: string;
    reservationComment?: string;
    price?: number | string;
    noShowDeposit?: number;
    reviewCount: number;
    stars: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    temporaryLecturenotification: { notification: string };
    temporaryLectureImage: { imageUrl: string }[];
    temporaryLectureCouponTarget: {
      lectureCouponId: number;
    }[];
    temporaryLectureToRegion: {
      region: {
        administrativeDistrict: string;
        district: string;
      };
    }[];
    temporaryLectureToDanceGenre: {
      name: null | string;
      danceCategory: {
        genre: string;
      };
    }[];
    temporaryLectureHoliday: {
      holiday: string;
    }[];
  };
  location: {
    id: number;
    lectureId: number;
    address: string;
    detailAddress: string;
    buildingName: string;
  } | null;
  schedules: DayTimeList[] | DateTimeList[];
}

export interface IUpdateClassDraft {
  lectureId: number | string;
  step?: number;
  regions?: string[];
  lectureType?: string;
  lectureMethod?: string;
  notification?: string;
  genres?: string[];
  etcGenres?: string[];
  images?: string[];
  title?: string;
  introduction?: string;
  curriculum?: string;
  detailAddress?: string | null;
  duration?: number;
  difficultyLevel?: string;
  minCapacity?: number;
  maxCapacity?: number;
  reservationDeadline?: string;
  reservationComment?: string;
  price?: number | string;
  noShowDeposit?: number;
  schedules?: DayTimeList[] | DateTimeList[];
  holidays?: string[];
  coupons?: number[];
}

export interface classCreateData {
  title: string;
  images: {
    file: File;
    imageUrl: string;
  }[];
  genres: string[];
  min: { value: number; label: string };
  max: { value: number; label: string };
  lectureMethod: string;
  lessonType: string;
  difficultyLevel: string;

  notification: string;
  introduction: string;
  curriculum: {
    content: string;
    deletedImages: fileInfo[];
    clear?: () => void;
  };
  holidays: Data[];
  classRange: { startDate: string; endDate: string };
  duration: number;
  reservationComment: string;
  reservationDeadline: string;
  address: Juso | null;
  detail: string;
  locationConsultative: boolean;
  regions: Record<string, string[]>;
  locationDescription: string;
  classPrice: string | number;
  schedules: DayTimeList[] | DateTimeList[];
  coupons: { value: couponGET; label: string }[];
}

export interface IprocessedDraft {
  id?: number;
  lecturerId?: number;
  step?: number | null;
  classRange?: {
    startDate?: string | null;
    endDate?: string | null;
  };
  lessonType?: string | null;
  lectureTypeId?: number;
  lectureMethod?: string | null;
  lectureMethodId?: number;
  title?: string;
  isGroup?: boolean | null;
  introduction?: string;
  curriculum?: string;
  detailAddress?: string | null;
  duration?: number;
  difficultyLevel?: string | null;
  min?: number;
  max?: number;
  reservationDeadline?: number;
  reservationComment?: string;
  price?: number | string;
  noShowDeposit?: number;
  reviewCount?: number;
  stars?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
  notification?: string;
  locationDescription?: string;
  temporaryLectureImage?: { imageUrl: string }[];
  temporaryLectureCouponTarget?: any[];
  regions?: {
    [key: string]: string[];
  };
  temporaryLectureToDanceGenre?: string[];
  holidays?: Data[];
  location?: {
    roadAddr: string | undefined;
    detailAddress: string | undefined;
    bdNm: string | undefined;
  };
  totalClasses?: number;
  schedules?: DayTimeList[] | DateTimeList[];
}

export type ReviewOrderType =
  | '최신순'
  | '좋아요순'
  | '평점 높은순'
  | '평점 낮은순';

export interface IClassSchedule {
  id: number;
  lectureId: number;
  startDateTime: string;
  endDateTime: string;
  numberOfParticipants: number;
}

export interface IClassScheduleResponse {
  schedule: IClassSchedule[];
  holidayArr: string[];
  daySchedule?: IDaySchedule[];
}

export interface IClassScheduleData {
  schedule: IClassSchedule[];
  holidayArr: Date[];
  daySchedule?: IDaySchedule[];
}

export interface IDaySchedule {
  id: number;
  lectureId: number;
  day: day[];
  dateTime: string[];
}

export interface IProcessedSchedules extends IClassSchedule {
  index: number;
  date: Date;
  isPastClass: boolean;
}

export interface IClassPreviewResponse {
  id: number;
  lecturerId: number;
  title: string;
  lectureImage: IClassImageResponse[];
  stars: number;
  isGroup: true;
  difficultyLevel: string;
  maxCapacity: number;
  duration: number;
  lectureToRegion: IClassRegionResponse[];
  isLike: boolean;
  lectureToDanceGenre: IClassGenreResponse[];
  price: number;
}

export interface IClassDetailResponse {
  id: number;
  lecturer: IInstructorProfile;
  startDate: string;
  endDate: string;
  reservationDeadline: number;
  reservationComment: string;
  price: number;
  notification: IClassNotification;
  introduction: string;
  curriculum: string;
  maxCapacity: number;
  minCapacity: number;
  reviewCount: number;
  locationDescription: string | null;
  location: string | null;
  duration: number;
  stars: number;
}

export interface IClassPostResponse {
  id: number;
  lecturerId: number;
  lectureTypeId: number;
  lectureMethodId: number;
  isGroup: boolean;
  startDate: string;
  endDate: string;
  title: string;
  introduction: string;
  curriculum: string;
  detailAddress: string;
  locationDescription: string;
  duration: number;
  difficultyLevel: string;
  minCapacity: number;
  maxCapacity: number;
  reservationDeadline: number;
  reservationComment: string;
  price: number;
  noShowDeposit: null;
  reviewCount: number;
  stars: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  lectureType: {
    name: string;
  };
  lectureMethod: {
    name: string;
  };
  lectureNotification: IClassNotification;

  lectureImage: IImage[];
  lectureToRegion: IRegion[];
  lectureToDanceGenre: IGenre[];
  isLike: boolean;
}

interface IImage {
  imageUrl: string;
}

export interface IUserReview {
  id: number;
  userId: number;
  user: {
    nickname: string;
    userProfileImage: null | string;
  };
  stars: number;
  description: string;
  startDateTime: string;
  lectureTitle: string;
  isLike: boolean;
  count: number;
}

export interface ILecturerClassListResonse {
  id: number;
  allSchedule: number;
  completedSchedule: number;
  startDate: string;
  endDate: string;
  title: string;
  [key: string]: any;
}

export interface ILecturerClassDetailResonse {
  title: string;
  notification: IClassNotification;
  reservationComment: string;
  maxCapacity: number;
  reservationDeadline: number;
  schedule: IClassSchedule[];
  holidays: string[];
}

export interface IClassEditRequest {
  images?: string[];
  minCapacity?: number;
  maxCapacity?: number;
  introduction?: string;
  curriculum?: string;
  reservationDeadline?: number;
  reservationComment?: string;
  price?: number;
  coupons?: number[];
  notification?: string;
  holidays?: Date[];
  endDate?: Date;
}

export interface IRegisterLists {
  enrollmentCount?: number;
  nickname: string;
  userProfileImage: {
    userId: number;
    imageUrl: string;
  };
}

export interface Lecture {
  id: number;
  lecturerId: number;
  lectureTypeId: number;
  lectureMethodId: number;
  isGroup: boolean;
  startDate: string;
  endDate: string;
  title: string;
  introduction: string;
  curriculum: string;
  duration: number;
  difficultyLevel: string;
  minCapacity: number;
  maxCapacity: number;
  reservationDeadline: number;
  reservationComment: string;
  price: number;
  noShowDeposit: number;
  reviewCount: number;
  stars: number;
  isActive: boolean;
  locationDescription: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

interface ResponseData {
  lecture: Lecture[];
}

export interface ApiResponse {
  statusCode: number;
  data: ResponseData;
}

export interface ILearner {
  id: number;
  enrollmentCount: number;
  memo: string;
  user: {
    id: number;
    nickname: string;
    userProfileImage: {
      imageUrl: string;
    };
  };
  reservation: {
    id: number;
    representative: string;
    phoneNumber: string;
    participants: number;
    requests: string;
    lectureSchedule: {
      id: number;
      startDateTime: string;
      endDateTime: string;
      numberOfParticipants: number;
      lecture: {
        createdAt: string;
        id: number;
        title: string;
      };
    };
  };
}

export interface IClassEditData
  extends IClassScheduleResponse,
    IClassPreviewResponse,
    IClassDetailResponse {}

export interface IClassEditPageData
  extends IClassScheduleData,
    IClassPreviewResponse,
    IClassDetailResponse {}

export interface IClassEditFormData {
  classRange: { startDate: string; endDate: string };
  images: {
    file: File;
    imageUrl: string;
  }[];
  curriculum: {
    content: string;
    deletedImages: fileInfo[];
    clear?: () => void;
  };
  holidays: Data[];
  introduction: string;
  locationDescription: string;
  maxCapacity: { value: number; label: string };
  notification: string;
  price: number;
  reservationComment: string;
  reservationDeadline: number;
  endDate: { startDate: string; endDate: string };
}

export interface searchClass {
  searchAfter: [number, number];
  id: number;
  title: string;
  price: number;
  lectureImages: string[];
  startDate: string;
  endDate: string;
  isGroup: boolean;
  isLiked: boolean;
  lectureMethod: string;
  stars: number;
  reviewCount: number;
  isActive: boolean;
  lecturer: {
    id: number;
    nickname: string;
    profileCardImageUrl: string;
  };
  regions: { id: number; administrativeDistrict: string; district: string }[];
  genres: { id: number; genre: string }[];
}

export interface IMonthlyClassSchedules extends IClassSchedule {
  lecture: {
    title: string;
    isGroup: boolean;
    maxCapacity: number;
  };
}

export interface IEditSpecificDateType {
  date: Date;
  startDateTime: IEditStartDateTime[];
}

export interface IEditStartDateTime {
  time: string;
  editable: boolean;
}

export interface IUserClassResponse {
  id: number;
  orderId: string;
  orderName: string;
  reservation: {
    lectureSchedule: {
      startDateTime: string;
      lecture: {
        id: number;
        title: string;
        lectureImage: {
          imageUrl: string;
        }[];
      };
    };
  }[];

  lecturer: {
    nickname: string;
    profileCardImageUrl: string;
  };
}

export interface IReservation {
  id: number;
  representative: string;
  phoneNumber: string;
  participants: number;
  requests: string;
  lectureSchedule: {
    id: number;
    lectureId: number;
    startDateTime: string;
    endDateTime: string;
    numberOfParticipants: number;
  };
}

export interface searchBestClassData {
  id: number;
  title: string;
  lectureImage: {
    id: number;
    imageUrl: string;
  }[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  price: number;
  stars: number;
  reviewCount: number;
  isGroup: boolean;
  lectureToDanceGenre: {
    danceCategoryId: number;
    name: null | string;
    danceCategory: { id: number; genre: string };
  }[];
  lectureToRegion: {
    region: { administrativeDistrict: string; district: string };
  }[];
  lecturer: {
    id: number;
    nickname: string;
    profileCardImageUrl: null | string;
    lecturerProfileImageUrl: null | string;
  };
  likedLecture?: {
    id: number;
  }[];
  lectureMethod?: {
    id: number;
    name: string;
  };
}

export interface searchClassParameters {
  take: number;
  sortOption: 'LATEST' | 'STARS';
  isGroup: boolean;
  value?: string;
  searchAfter?: [number, number];
  genres?: string[];
  regions?: string[];
  stars?: number;
  days?: day[];
  timeOfDay?: TimeOfDay[];
  gtePrice?: number;
  ltePrice?: number;
  lectureMethod?: string | undefined;
  getDate?: Date;
  lteDate?: Date;
}

export interface searchClass {
  searchAfter: [number, number];
  id: number;
  title: string;
  price: number;
  lectureImages: string[];
  startDate: string;
  endDate: string;
  isGroup: boolean;
  lectureMethod: string;
  stars: number;
  reviewCount: number;
  lecturer: {
    id: number;
    nickname: string;
    profileCardImageUrl: string;
  };
  regions: { id: number; administrativeDistrict: string; district: string }[];
  genres: { id: number; genre: string }[];
  days: null | { day: [day]; dateTime: string[] };
  isLiked?: boolean;
}

export interface LikedLecture {
  id: number;
  lectureId: number;
  userId: number;
  lecture: {
    id: number;
    lecturerId: number;
    lectureTypeId: number;
    lectureMethodId: number;
    isGroup: boolean;
    startDate: string;
    endDate: string;
    title: string;
    introduction: string;
    curriculum: string;
    duration: number;
    difficultyLevel: string;
    minCapacity: number;
    maxCapacity: number;
    reservationDeadline: number;
    reservationComment: string;
    price: number;
    noShowDeposit: null | number;
    reviewCount: number;
    stars: number;
    isActive: boolean;
    locationDescription: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
  };
}

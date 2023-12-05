import { fileInfo } from 'suneditor/src/lib/core';
import { couponGET } from './coupon';
import { IRegion, IGenre } from './types';
import { Juso } from '@/types/address';

export interface ClassCardType {
  status: '모집중' | '마감임박' | '마감';
  date: string;
  title: string;
  imgURL: string[];
  location: string[];
  genre: string[];
  type: string[];
  time: string[];
  review?: { average: number; count: number };
  price: string;
  profile: { src?: string; nickname: string };
  selectedDates: Date[];
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

export interface DayTimeList {
  day: string[];
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

export type ReviewOrderType =
  | '최신순'
  | '좋아요순'
  | '평점 높은순'
  | '평점 낮은순';

export interface IClassSchedule {
  id: number;
  lectureId: number;
  startDateTime: string;
  numberOfParticipants: number;
  team: null | string;
}

export interface IClassScheduleResponse {
  schedule: IClassSchedule[];
  holidayArr: string[];
}

export interface IClassInfoResponse {
  lecture: IClassPostResponse;
  lecturer: IInstructorProfile;
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

export interface IClassNotification {
  id: number;
  lectureId: number;
  notification: string;
  updatedAt: string;
  deletedAt: null;
}

interface IInstructorProfile {
  id: number;
  profileCardImageUrl: null | string;
  nickname: string;
}

interface IHoilday {
  holiday: string;
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

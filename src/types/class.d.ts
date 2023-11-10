import { fileInfo } from 'suneditor/src/lib/core';
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

export interface DateTime {
  date: string;
  space: Space;
  count: number;
}

export interface DayTimeList {
  day: string[];
  timeSlots: string[];
}

export interface IGetClassDrafts {
  id: string;
  updatedAt: string;
  title: null | string;
  step: null | string;
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
    lectureMethod?: {
      name: string;
    } | null;
    reservationDeadline?: string;
    reservationComment?: string;
    price?: number;
    noShowDeposit?: number;
    reviewCount: number;
    stars: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    temporaryLecturenotification: { notification: string };
    temporaryLectureImage: { imageUrl: string }[];
    temporaryLectureCouponTarget: any[];
    temporaryLectureSchedule: {
      startDateTime: string;
      team: null;
      numberOfParticipants: number;
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
  temporaryLectureDateSchedule: string[] | null;
}

export interface IUpdateClassDraft {
  lectureId: number | string;
  step: number;
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
  price?: number;
  noShowDeposit?: number;
  schedules?: string[];
  regularSchedules?: {
    [key: string]: string[];
  };
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
  classSize?: {
    min: number;
    max: number;
  };
  reservationDeadline?: number;
  reservationComment?: string;
  price?: number;
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
  temporaryLectureSchedule?: {
    startDateTime: string;
    team: null;
    numberOfParticipants: number;
  }[];
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
  temporaryLectureDateSchedule?: string[] | [];
  totalClasses?: number;
}

export interface classCreateData {
  title: string;
  images: {
    file: File;
    imageUrl: string;
  }[];
  genres: string[];
  classSize: {
    min: number;
    max: number;
  };
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
}

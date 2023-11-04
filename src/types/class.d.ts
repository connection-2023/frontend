import { IRegion, IGenre } from './types';
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
  timeSlots: string[];
}

export interface IClassSchedule {
  id: number;
  lectureId: number;
  startDateTime: string;
  numberOfParticipants: number;
  team: null | string;
}

export interface IClassPostResponse {
  id: number;
  lecturerId: number;
  lectureTypeId: number;
  lectureMethodId: number;
  isGroup: boolean;
  title: string;
  introduction: string;
  curriculum: string;
  detailAddress: string;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | string;
  lectureType: {
    name: string;
  };
  lectureMethod: {
    name: string;
  };
  lectureReview: IUserReview[];
  lectureNotification: {
    notification: string;
  };
  lectureImage: IImage[];
  lectureCouponTarget: any; // 변경 예정
  lectureSchedule: IClassSchedule[];
  lectureHoliday: IHoilday[];
  lectureToRegion: IRegion[];
  lectureToDanceGenre: IGenre[];

  lecturer: IInstructorProfile;
}

interface IInstructorProfile {
  id: number;
  profileCardImageUrl: null | string;
  nickname: string;
}

interface IHoilday {
  holiday: Date | string;
}

interface IImage {
  imageUrl: string;
}

interface IUserReview {
  id: number;
  userId: number;
  users: {
    nickname: string;
    userProfileImage: null | string;
  };
  stars: number;
  description: string;
}

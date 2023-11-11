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
  users: {
    nickname: string;
    userProfileImage: null | string;
  };
  stars: number;
  description: string;
}

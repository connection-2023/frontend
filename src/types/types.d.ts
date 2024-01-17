import { day } from './class';

export interface IBootOption {
  pluginKey: string;
  language: string;
  id?: string;
  profile?: {
    name: string;
    mobileNumber: string;
    userType: 'user' | 'lecturer';
  };
}

export interface IFilterButton {
  label: '지역' | '장르' | '평점' | '가격' | '지정날짜' | '진행방식' | '시간';
  content: React.JSX.Element;
}

export interface IFilterOptions {
  regions: Record<string, string[]>;
  genre: string[];
  review: number;
  price?: [number, number];
  date?: [string, string];
  method?: string;
  daytime?: {
    week: day[];
    time: string[];
  };
  group?: string;
}

export interface dateTimes {
  date: Date;
  time: string[];
}

export interface IFullCalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  numberOfParticipants: number;
  maxCapacity: number;
  isGroup: boolean;
  lectureId: number;
}

export interface ErrorMessage {
  key: string;
  type: string;
  message: string;
  ref: any;
}

export interface ITableList {
  id: number;
  name: string;
  purchase: string;
  date: string;
  price: string;
  status: string;
}

export interface IPaymentList {
  date: string;
  period: string;
  amount: string;
  status: '입금완료' | '처리중';
}

export interface IReportList {
  id: number;
  target: string;
  reason: string;
  detail: string;
  status: '처리중' | '처리완료';
}

export type paymentType = 'card' | 'deposit' | null;

export interface Instructors {
  id: number;
  name: string;
  address: string[];
  teamAffiliation: string;
  genres: string[];
  imgURL: string[];
  average: number;
  href: string;
}

export interface InstructorCardProps extends Instructors {
  largeImg: boolean;
  isLiked: boolean;
  searchAfter?: [number, number];
  likeEvent?: (id: string | number) => void;
}

export interface INoticeMessage {
  message: string;
  date: string;
  isRead: boolean;
}

export interface INotice {
  type: string;
  id: string;
  date: string;
  isRead: boolean;
  title: string;
  contents: INoticeMessage[];
}

export interface Verification {
  nickname: boolean;
  email: boolean;
  phoneNumber: boolean;
  accountNumber: boolean;
}

export interface IRegion {
  administrativeDistrict: string;
  district: string;
}

export interface IGenre {
  name: string | null;
  danceCategory: { genre: string };
}

export interface IMyPayment {
  id: number;
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentProductType: {
    name: '클래스' | '패스권';
  };
  paymentMethod: {
    name: '카드' | '가상계좌';
  };
  paymentStatus: {
    name: 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED';
  };
  updatedAt: string;
  reservation: {
    participants: number;
    requests: string;
    lectureSchedule: {
      lectureId: number;
      startDateTime: string;
      lecture: {
        lectureImage: {
          imageUrl: string;
        }[];
      };
    };
  }[];

  userPass: string[];
}

export interface IMyPaymentResponse {
  totalItemCount: number;
  paymentHistory: IMyPayment[];
}

export interface FetchError extends Error {
  status?: number;
}

export interface PagenationFilterState {
  take: number | undefined;
  firstItemId?: number;
  lastItemId?: number;
  currentPage?: number;
  targetPage?: number;
  [key: string]: any | undefined;
}

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'DAWN';

export interface SearchParams {
  [key: string]:
    | string
    | 'LATEST'
    | 'STARS'
    | string[]
    | number
    | undefined
    | TimeOfDay[]
    | day[];
  query?: string;
  sortOption?: 'LATEST' | 'STARS';
  genre?: string[];
  regions?: string;
  stars?: string;
  group?: string;
  gtePrice?: string;
  ltePrice?: string;
  gteDate?: string;
  lteDate?: string;
  method?: string;
  days?: day[];
  timeOfDay?: TimeOfDay[];
}

export interface instructorSearchData {
  take: number;
  sortOption: 'LATEST' | 'STARS';
  value: string | undefined;
  genres: string[];
  regions: string[];
  stars: number;
  searchAfter?: [number, number];
}

export interface classSearchData {
  take: number;
  sortOption: 'LATEST' | 'STARS';
  value: string | undefined;
  genres: string[];
  regions: string[];
  stars: number;
  isGroup: boolean;
  gtePrice: number;
  ltePrice: number;
  gteDate: Date | undefined;
  lteDate: Date | undefined;
  lectureMethod: string | undefined;
  days: day[];
  timeOfDay: TimeOfDay[];
  searchAfter?: [number, number];
}

export type CityList =
  | '서울'
  | '경기'
  | '부산'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';

export interface DayTimeFilterOption {
  week: day[];
  time: string[];
}

export type FilterKey =
  | '지역'
  | '장르'
  | '평점'
  | '가격'
  | '지정날짜'
  | '인원'
  | '진행 방식'
  | '요일/시간대';

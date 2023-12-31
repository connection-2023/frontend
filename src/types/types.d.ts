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
  price: number[];
  date: string[];
  method: string[];
  daytime: string[];
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

export interface SearchParams {
  query?: string;
  sortOption?: 'LATEST' | 'STARS';
  genres?: string[];
  regions?: string;
  stars?: number;
}

export interface instructorSearchData {
  take: number;
  sortOption: 'LATEST' | 'STARS';
  value: string | undefined;
  genres: string[] | undefined;
  regions: string[] | undefined;
  stars: number | undefined;
}

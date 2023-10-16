export interface IFilterButton {
  label: '지역' | '장르' | '평점' | '가격' | '지정날짜' | '진행방식' | '시간';
  content: React.JSX.Element;
}

export interface IFilterOptions {
  location: Record<string, string[]>;
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

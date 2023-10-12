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

export interface ITableList {
  id: number;
  name: string;
  purchase: string;
  date: string;
  price: string;
  status: string;
}

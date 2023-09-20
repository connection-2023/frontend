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

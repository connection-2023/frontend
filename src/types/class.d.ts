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

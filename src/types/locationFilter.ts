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

export interface LocationFilterList {
  서울?: string[];
  부산?: string[];
  대구?: string[];
  인천?: string[];
  광주?: string[];
  대전?: string[];
  울산?: string[];
  세종?: string[];
  경기?: string[];
  강원?: string[];
  충북?: string[];
  충남?: string[];
  전북?: string[];
  전남?: string[];
  경북?: string[];
  경남?: string[];
  제주?: string[];
}

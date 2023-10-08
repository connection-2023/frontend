import { atom } from 'recoil';

interface ClassCreateState {
  장르: string[];
  이미지: { file: File; url: string }[];
  인원: string;
  수강생제한: { min: number; max: number };
}

export const classCreateState = atom({
  key: 'classCreateState',
  default: <ClassCreateState>{
    장르: [],
    이미지: [],
    인원: '',
    수강생제한: { min: 0, max: 100 },
  },
});

//추후 api 연결시 요소명 변경 예정

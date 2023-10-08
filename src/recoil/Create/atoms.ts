import { atom } from 'recoil';

interface ClassCreateState {
  장르: string[];
  이미지: { file: File; url: string }[];
}

export const classCreateState = atom({
  key: 'classCreateState',
  default: <ClassCreateState>{
    장르: [],
    이미지: [],
  },
});

//추후 api 연결시 요소명 변경 예정

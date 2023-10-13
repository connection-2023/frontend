import { QUILL_DEFAULT_VALUE } from '@/constants/constants';
import { atom } from 'recoil';

interface ClassCreateState {
  장르: string[];
  이미지: { file: File; url: string }[];
  인원: string;
  수강생제한: { min: number; max: number };
  커리큘럼: string;
}

export const classCreateState = atom({
  key: 'classCreateState',
  default: <ClassCreateState>{
    장르: [],
    이미지: [],
    인원: '',
    수강생제한: { min: 1, max: 100 },
    커리큘럼: QUILL_DEFAULT_VALUE,
  },
});

//추후 api 연결시 요소명 한글 -> 영어 변경 예정

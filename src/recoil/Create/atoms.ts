import { QUILL_DEFAULT_VALUE } from '@/constants/constants';
import { atom } from 'recoil';

interface ClassCreateState {
  classGenre: string[];
  classImg: { file: File; url: string }[];
  classLessonType: string;
  classSize: { min: number; max: number };
  classCurriculum: string;
}

export const classCreateState = atom({
  key: 'classCreateState',
  default: <ClassCreateState>{
    classGenre: [],
    classImg: [],
    classLessonType: '',
    classSize: { min: 1, max: 100 },
    classCurriculum: QUILL_DEFAULT_VALUE,
  },
});

//추후 api 연결시 요소명 한글 -> 영어 변경 예정

//className
//classImg
//classGenre
//classLessonType
//classSize
//classProgressMethod
//classDifficultyLevel

//2
//classAnnouncement
//classOperationPlan
//classCurriculum

//3
//classLocationConsultative
//classConfirmedLocation
//classDetailAddress
//classLocationCaution
//classPendingLocation

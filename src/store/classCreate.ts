import { createContext } from 'react';
import { create } from 'zustand';
import { IGetClassDraft, IprocessedDraft } from '@/types/class';

interface IUseClassCreateStore {
  classData: IprocessedDraft | null;
  setClassData: (data: IGetClassDraft | null) => void;
}

export const useClassCreateStore = create<IUseClassCreateStore>()((set) => ({
  classData: null,
  setClassData: (data: IGetClassDraft | null) =>
    set({ classData: data ? dataProcess(data) : data }),
}));

const dataProcess = (data: IGetClassDraft) => {
  const genres = data.temporaryLectureToDanceGenre.map(
    (item) => item.danceCategory.genre,
  );

  const difficultyLevel =
    data.difficultyLevel === '상'
      ? '상급'
      : data.difficultyLevel === '중'
      ? '중급'
      : data.difficultyLevel === '하'
      ? '초급(입문)'
      : null;

  const lectureMethod =
    data.lectureMethod === '원데이' ? '원데이 레슨' : '정기클래스';

  const lessonType = data.isGroup ? '그룹레슨' : '개인(1:1)레슨';

  return {
    ...data,
    temporaryLectureToDanceGenre: genres,
    difficultyLevel,
    lectureMethod,
    lessonType,
  };
};

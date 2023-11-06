import { create } from 'zustand';
import { formatDate } from '@/utils/apiDataProcessor';
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
    data.lectureMethod === '원데이'
      ? '원데이 레슨'
      : data.lectureMethod === '정기'
      ? '정기클래스'
      : null;

  const lessonType =
    data.isGroup === null ? null : data.isGroup ? '그룹레슨' : '개인(1:1)레슨';

  const notification = data.temporaryLecturenotification?.notification;

  const newStartDate =
    data.startDate === null ? null : formatDate(data.startDate);

  const newEndDatee = data.endDate === null ? null : formatDate(data.endDate);

  return {
    ...data,
    temporaryLectureToDanceGenre: genres,
    difficultyLevel,
    lectureMethod,
    lessonType,
    notification,
    endDate: newEndDatee,
    startDate: newStartDate,
  };
};

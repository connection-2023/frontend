import { create } from 'zustand';
import { formatDate, resRegions } from '@/utils/apiDataProcessor';
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
    data.lectureMethod?.name === '원데이'
      ? '원데이 레슨'
      : data.lectureMethod?.name === '정기'
      ? '정기클래스'
      : null;

  const lessonType =
    data.isGroup === null ? null : data.isGroup ? '그룹레슨' : '개인(1:1)레슨';

  const classSize = {
    max: data.maxCapacity ?? 100,
    min: data.minCapacity ?? 1,
  };

  const notification = data.temporaryLecturenotification?.notification;

  const startDate = data.startDate === null ? '' : formatDate(data.startDate);

  const endDate = data.endDate === null ? '' : formatDate(data.endDate);

  const holidays = data.temporaryLectureHoliday.map(
    ({ holiday }) => new Date(holiday),
  );

  const reservationDeadline = Number(data.reservationDeadline);

  const regions = resRegions(
    data.temporaryLectureToRegion.map(({ region }) => region),
  );

  return {
    ...data,
    temporaryLectureToDanceGenre: genres,
    difficultyLevel,
    lectureMethod,
    lessonType,
    notification,
    classRange: {
      startDate,
      endDate,
    },
    holidays,
    reservationDeadline,
    regions,
    classSize,
  };
};

import create from 'zustand';
import { IprocessedDraft } from '@/types/class';

interface IUseClassCreateStore {
  lectureData: IprocessedDraft | null;
  setLectureData: (data: IprocessedDraft) => void;
}

export const useClassCreateStore = create<IUseClassCreateStore>((set) => ({
  lectureData: null,
  setLectureData: (data) => set({ lectureData: data }),
}));

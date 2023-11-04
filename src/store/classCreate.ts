import create from 'zustand';
import { IprocessedDraft } from '@/types/class';

interface IUseClassCreateStore {
  classData: IprocessedDraft | null;
  setClassData: (data: IprocessedDraft) => void;
}

export const useClassCreateStore = create<IUseClassCreateStore>((set) => ({
  classData: null,
  setClassData: (data) => set({ classData: data }),
}));

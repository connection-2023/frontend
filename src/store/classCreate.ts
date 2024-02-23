import { create } from 'zustand';
import { classDraftsDataProcess } from '@/utils/apiDataProcessor';
import { IGetClassDraft, IprocessedDraft } from '@/types/class';

interface IUseClassCreateStore {
  classData: IprocessedDraft | null;
  setClassData: (data: IGetClassDraft | null) => void;
  setProcessedClassData: (data: IprocessedDraft) => void;
}

export const useClassCreateStore = create<IUseClassCreateStore>()((set) => ({
  classData: null,
  setClassData: (data: IGetClassDraft | null) =>
    set({ classData: data ? classDraftsDataProcess(data) : data }),
  setProcessedClassData: (data: IprocessedDraft) => set({ classData: data }),
}));

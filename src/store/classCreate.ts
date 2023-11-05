import { createContext } from 'react';
import { create } from 'zustand';
import { IGetClassDraft, IprocessedDraft } from '@/types/class';

interface IUseClassCreateStore {
  classData: IprocessedDraft | null;
  setClassData: (data: IGetClassDraft) => void;
}

export const useClassCreateStore = create<IUseClassCreateStore>()((set) => ({
  classData: null,
  setClassData: (data) => set({ classData: data }),
}));

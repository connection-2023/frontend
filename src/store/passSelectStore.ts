import { create } from 'zustand';
import { IpassData } from '@/types/pass';

interface passSelectStore {
  passInfo?: IpassData;
  setpassInfo: (info?: IpassData) => void;
}

export const usePassSelectStore = create<passSelectStore>((set) => ({
  passInfo: undefined,
  setpassInfo: (info) => set({ passInfo: info }),
}));

import { create } from 'zustand';

interface IClassProgressStore {
  totalClass: number;
  pastClass: number;
  setTotalClass: (data: number) => void;
  setPastClass: (data: number) => void;
}

export const useClassProgressStore = create<IClassProgressStore>()((set) => ({
  totalClass: 0,
  pastClass: 0,
  setTotalClass: (data: number) => set({ totalClass: data }),
  setPastClass: (data: number) => set({ pastClass: data }),
}));

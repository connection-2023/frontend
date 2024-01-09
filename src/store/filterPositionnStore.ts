import { create } from 'zustand';

interface usefilterPositionnStore {
  isScrolling: boolean;
  setIsScrolling: (value: (prev: boolean) => boolean) => void;
}

export const usefilterPositionnStore = create<usefilterPositionnStore>(
  (set) => ({
    isScrolling: false,
    setIsScrolling: (value) =>
      set((state) => ({ isScrolling: value(state.isScrolling) })), // 변경된 부분
  }),
);

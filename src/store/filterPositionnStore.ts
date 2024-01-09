import { create } from 'zustand';

interface usefilterStore {
  isScrolling: boolean;
  setIsScrolling: (value: (prev: boolean) => boolean) => void;
  isfilterModalOpen: boolean;
  setIsfilterModalOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const usefilterStore = create<usefilterStore>((set) => ({
  isScrolling: false,
  isfilterModalOpen: false,
  setIsScrolling: (value) =>
    set((state) => ({ isScrolling: value(state.isScrolling) })),
  setIsfilterModalOpen: (value) =>
    set((state) => ({
      isfilterModalOpen:
        typeof value === 'function' ? value(state.isfilterModalOpen) : value,
    })),
}));

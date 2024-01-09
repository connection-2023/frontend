import { create } from 'zustand';

interface usefilterStore {
  isScrolling: boolean;
  setIsScrolling: (value: (prev: boolean) => boolean) => void;
  isfilterModalOpen: boolean;
  setIsfilterModalOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  openFilterLabel: string | null;
  setOpenFilterLabel: (label: string | null) => void;
}

export const usefilterStore = create<usefilterStore>((set) => ({
  isScrolling: false,
  isfilterModalOpen: false,
  openFilterLabel: null,
  setIsScrolling: (value) =>
    set((state) => ({ isScrolling: value(state.isScrolling) })),
  setIsfilterModalOpen: (value) =>
    set((state) => ({
      isfilterModalOpen:
        typeof value === 'function' ? value(state.isfilterModalOpen) : value,
    })),
  setOpenFilterLabel: (label) => set({ openFilterLabel: label }),
}));

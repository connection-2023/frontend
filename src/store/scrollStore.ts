import { create } from 'zustand';

interface useScrollStore {
  isScrollingUp: boolean;
  setIsScrollingUp: (value: boolean) => void;
}

export const useScrollStore = create<useScrollStore>((set) => ({
  isScrollingUp: true,
  setIsScrollingUp: (value: boolean) => set(() => ({ isScrollingUp: value })),
}));

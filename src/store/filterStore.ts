import { create } from 'zustand';

interface usefilterStore {
  isScrolling: boolean;
  setIsScrolling: (value: (prev: boolean) => boolean) => void;
  isfilterModalOpen: boolean;
  setIsfilterModalOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  openFilterLabel: string | null;
  setOpenFilterLabel: (label: string | null) => void;
  resetFunctions: (() => void)[];
  addResetFunction: (func: () => void) => void;
  executeAllResets: () => void;
  filterList: {
    [key: string]: any;
  };
  filterListUpdate: (key: string, value: any) => void;
}

export const usefilterStore = create<usefilterStore>((set, get) => ({
  filterList: {},
  isScrolling: false,
  isfilterModalOpen: false,
  openFilterLabel: null,
  resetFunctions: [],
  setIsScrolling: (value) =>
    set((state) => ({ isScrolling: value(state.isScrolling) })),
  setIsfilterModalOpen: (value) =>
    set((state) => ({
      isfilterModalOpen:
        typeof value === 'function' ? value(state.isfilterModalOpen) : value,
    })),
  setOpenFilterLabel: (label) => set({ openFilterLabel: label }),
  addResetFunction: (func) =>
    set((state) => ({ resetFunctions: [...state.resetFunctions, func] })),
  executeAllResets: () => {
    const { resetFunctions } = get();
    resetFunctions.forEach((func: () => void) => func());
  },
  filterListUpdate: (key, value) => {
    set((state) => ({
      filterList: {
        ...state.filterList,
        [key]: value,
      },
    }));
  },
}));

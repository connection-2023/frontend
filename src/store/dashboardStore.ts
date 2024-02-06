import { create } from 'zustand';

interface IDashboardStore {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export const dashboardStore = create<IDashboardStore>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

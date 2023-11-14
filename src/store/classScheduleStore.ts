import { create } from 'zustand';
import { DateRange } from 'react-day-picker';

interface IClassScheduleStore {
  classRange: DateRange | undefined;
  setClassRange: (newRange: DateRange) => void;
  classDuration: number | undefined;
  setClassDuration: (time: number) => void;
  filteredDates: Date[] | undefined;
  setFilteredDate: (date: Date[]) => void;
  classDates: Date[] | undefined;
  setClassDates: (date: Date[]) => void;
  classType: string | undefined;
  setClassType: (type: string) => void;
}

export const useClassScheduleStore = create<IClassScheduleStore>((set) => ({
  classRange: undefined,
  setClassRange: (newRange) => set({ classRange: newRange }),
  classDuration: undefined,
  setClassDuration: (newRange) => set({ classDuration: newRange }),
  filteredDates: undefined,
  setFilteredDate: (date) => set({ filteredDates: date }),
  classDates: undefined,
  setClassDates: (date) => set({ classDates: date }),
  classType: undefined,
  setClassType: (type) => set({ classType: type }),
}));

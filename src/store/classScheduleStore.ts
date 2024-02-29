import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

interface IClassScheduleStore {
  classRange: DateRange | undefined;
  setClassRange: (newRange: DateRange | undefined) => void;
  classDuration: number | undefined;
  setClassDuration: (time: number) => void;
  classType: string | undefined;
  setClassType: (type: string) => void;
  // 휴무일을 제외한 최종 스케쥴 날짜
  finalDates: Date[] | undefined;
  setFinalDate: (date: Date[]) => void;
  // 휴무일을 포함한 전체 스케쥴
  classDates: Date[] | undefined;
  setClassDates: (date: Date[]) => void;
}

export const useClassScheduleStore = create<IClassScheduleStore>((set) => ({
  classRange: undefined,
  setClassRange: (newRange) => set({ classRange: newRange }),
  classDuration: undefined,
  setClassDuration: (newRange) => set({ classDuration: newRange }),
  finalDates: undefined,
  setFinalDate: (date) => set({ finalDates: date }),
  classDates: undefined,
  setClassDates: (date) => set({ classDates: date }),
  classType: undefined,
  setClassType: (type) => set({ classType: type }),
}));

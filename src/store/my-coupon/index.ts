import create from 'zustand';
import {
  MY_COUPON_CLASS_LIST_LENGTH,
  MY_COUPON_FILTER_OPTIONS,
} from '@/constants/constants';
import { dummyCouponClassList } from '@/constants/dummy';

type State = {
  selectedOption: string;
  sortOption: string;
  selectClassFilter: string[];
  classListLength: number;
  classFilter: boolean;
  refreshButton: boolean;

  changeSelectedOption(option: string): void;

  classFilterChange(className: string): void;

  classFilterReset(): void;

  classFilterViewChange(): void;

  changeSortOption(sortOption: string): void;

  changeClassListLength(): void;
};

const useCouponStore = create<State>((set) => ({
  selectedOption: MY_COUPON_FILTER_OPTIONS[0],
  sortOption: '최신순',
  selectClassFilter: dummyCouponClassList,
  classListLength: MY_COUPON_CLASS_LIST_LENGTH,
  classFilter: false,
  refreshButton: !(
    dummyCouponClassList.length === dummyCouponClassList.length &&
    MY_COUPON_CLASS_LIST_LENGTH === MY_COUPON_CLASS_LIST_LENGTH
  ),

  changeSelectedOption(option) {
    set((state) => ({
      selectedOption: option,
      classFilter:
        MY_COUPON_FILTER_OPTIONS[0] !== option ? false : state.classFilter,
    }));
  },

  classFilterChange(className) {
    set((state) => {
      let newSelectClassFilter = [...state.selectClassFilter];

      if (newSelectClassFilter.length === dummyCouponClassList.length)
        newSelectClassFilter = [className];
      else if (newSelectClassFilter.includes(className)) {
        newSelectClassFilter =
          newSelectClassFilter.length - 1 === 0
            ? [...dummyCouponClassList]
            : newSelectClassFilter.filter((item) => item !== className);
      } else newSelectClassFilter.push(className);

      return {
        selectClassFilter: newSelectClassFilter,
        refreshButton: !(
          newSelectClassFilter.length === dummyCouponClassList.length &&
          state.classListLength === MY_COUPON_CLASS_LIST_LENGTH
        ),
      };
    });
  },

  classFilterReset: () =>
    set(() => ({
      selectClassFilter: [...dummyCouponClassList],
      classListLength: MY_COUPON_CLASS_LIST_LENGTH,
      refresshButtttonn: false,
    })),

  classFilterViewChange: () =>
    set((state) => ({
      classFilter: !state.classFilter,
      selectedOption: !state.classFilter
        ? MY_COUPON_FILTER_OPTIONS[0]
        : state.selectedOption,
    })),

  changeSortOption: (sortOption: string) => set(() => ({ sortOption })),

  changeClassListLength: () =>
    set((state) => ({
      classListLength: state.classListLength + MY_COUPON_CLASS_LIST_LENGTH,
      refreshButton: !(
        state.selectClassFilter.length === dummyCouponClassList.length &&
        state.classListLength + MY_COUPON_CLASS_LIST_LENGTH ===
          MY_COUPON_CLASS_LIST_LENGTH
      ),
    })),
}));

export default useCouponStore;

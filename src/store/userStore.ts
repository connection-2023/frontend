import { create } from 'zustand';
import { userType, profileInfo } from '@/types/auth';

export interface IUserStore {
  authUser: profileInfo | null;
  userType: userType | null;
  requestLoading: boolean;
  likeClassList: number[];
  likeInstructorList: number[];
  setUserType: (type: userType | null) => void;
  setAuthUser: (user: profileInfo | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
  setLikeClassList: (list: number[]) => void;
  setLikeInstructorList: (list: number[]) => void;
  setAuthUserField: <K extends keyof profileInfo>(
    field: K,
    value: profileInfo[K],
  ) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  authUser: null,
  userType: null,
  requestLoading: false,
  likeClassList: [],
  likeInstructorList: [],
  setUserType: (type) => set((state) => ({ ...state, userType: type })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
  setLikeClassList: (list: number[]) => set({ likeClassList: [...list] }),
  setLikeInstructorList: (list: number[]) =>
    set({ likeInstructorList: [...list] }),
  setAuthUserField: <K extends keyof profileInfo>(
    field: K,
    value: profileInfo[K],
  ) =>
    set((state) =>
      state.authUser
        ? {
            ...state,
            authUser: {
              ...state.authUser,
              [field]: value,
            },
          }
        : state,
    ),
}));

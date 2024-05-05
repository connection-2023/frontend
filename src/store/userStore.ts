import { create } from 'zustand';
import { userType, profileInfo } from '@/types/auth';

export interface IUserStore {
  authUser: profileInfo | null;
  userType: userType | null;
  isMobile: boolean | null;
  requestLoading: boolean;
  setUserType: (type: userType | null) => void;
  setAuthUser: (user: profileInfo | null) => void;
  setIsMobile: (isMobile: boolean) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
  setAuthUserField: <K extends keyof profileInfo>(
    field: K,
    value: profileInfo[K],
  ) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  authUser: null,
  userType: null,
  isMobile: null,
  requestLoading: false,
  setUserType: (type) => set((state) => ({ ...state, userType: type })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setIsMobile: (isMobile) => set({ isMobile }),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
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

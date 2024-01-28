import { create } from 'zustand';
import { userProfile, userType, instructorProfile } from '@/types/auth';

export interface IUserStore {
  authUser: userProfile | instructorProfile | null;
  userType: userType | null;
  requestLoading: boolean;
  likeClassList: number[];
  likeInstructorList: number[];
  setUserType: (type: userType | null) => void;
  setAuthUser: (user: userProfile | instructorProfile | null) => void;
  setAuthUserImage: (imageUrl: string) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
  setLikeClassList: (list: number[]) => void;
  setLikeInstructorList: (list: number[]) => void;
  setAuthUserField: (field: string, value: any) => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
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
  setAuthUserImage(imageUrl) {
    const currentUser = get().authUser;

    if (currentUser) {
      const updatedUser = { ...currentUser, userProfileImage: { imageUrl } };
      set({ authUser: updatedUser });
    }
  },
  setAuthUserField: (field: string, value: any) =>
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

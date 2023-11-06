import { create } from 'zustand';
import { userProfile, userType, instructorProfile } from '@/types/auth';

export interface IUserStore {
  authUser: userProfile | instructorProfile | null;
  userType: userType | null;
  requestLoading: boolean;
  setUserType: (type: userType | null) => void;
  setAuthUser: (user: userProfile | instructorProfile | null) => void;
  setAuthUserImage: (imageUrl: string) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  authUser: null,
  userType: null,
  requestLoading: false,
  setUserType: (type) => set((state) => ({ ...state, userType: type })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setAuthUserImage(imageUrl) {
    const currentUser = get().authUser;

    if (currentUser) {
      const updatedUser = { ...currentUser, userProfileImage: { imageUrl } };
      set({ authUser: updatedUser });
    }
  },
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
}));

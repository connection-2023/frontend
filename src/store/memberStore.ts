import { create } from 'zustand';

interface MemberStore {
  memberInfo?: string;
  setMemberInfo: (info?: string) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  memberInfo: undefined,
  setMemberInfo: (info) => set({ memberInfo: info }),
}));

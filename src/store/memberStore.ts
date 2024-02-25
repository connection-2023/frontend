import { create } from 'zustand';
import { MemberInfo } from '@/types/instructor';

interface MemberStore {
  memberInfo?: MemberInfo;
  setMemberInfo: (info?: MemberInfo) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  memberInfo: undefined,
  setMemberInfo: (info) => set({ memberInfo: info }),
}));

import { create } from 'zustand';

interface chatStore {
  selectChatRoom: any | null;
  setChatRoomSelect: (chat: any) => void;
  chatView: boolean;
  setChatView: (state: boolean) => void;
}

export const useChatStore = create<chatStore>((set) => ({
  selectChatRoom: null,
  chatView: false,
  setChatView: (state) => set({ chatView: state }),
  setChatRoomSelect: (chatRoom) => set({ selectChatRoom: chatRoom }),
}));

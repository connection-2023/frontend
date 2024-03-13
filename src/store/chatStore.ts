import { create } from 'zustand';
import { ChatRoomList } from '@/types/chat';

interface chatStore {
  selectChatRoom: ChatRoomList | null;
  setChatRoomSelect: (chat: any) => void;
  chatView: boolean;
  setChatView: (state: boolean) => void;
}

export const useChatStore = create<chatStore>((set) => ({
  selectChatRoom: null,
  chatView: false,
  setChatView: (state) => {
    if (!state) {
      set({ selectChatRoom: null });
    }
    set({ chatView: state });
  },
  setChatRoomSelect: (chatRoom: ChatRoomList) =>
    set({ selectChatRoom: chatRoom }),
}));

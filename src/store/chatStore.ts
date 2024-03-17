import { create } from 'zustand';
import { Chat, ChatRoomList, NewChatsList } from '@/types/chat';

interface chatStore {
  selectChatRoom: ChatRoomList | null;
  setChatRoomSelect: (chat: any) => void;
  chatView: boolean;
  setChatView: (state: boolean) => void;
  newChat: Chat | null;
  setNewChat: (newChat: Chat) => void;
}

export const useChatStore = create<chatStore>((set) => ({
  selectChatRoom: null,
  chatView: false,
  newChat: null,
  setChatView: (state) => {
    if (!state) {
      set({ selectChatRoom: null });
    }
    set({ chatView: state });
  },
  setChatRoomSelect: (chatRoom: ChatRoomList) =>
    set({ selectChatRoom: chatRoom }),
  setNewChat: (newChat) => set({ newChat }),
}));

import { create } from 'zustand';
import { Chat, ChatRoomList, NewChatsList } from '@/types/chat';

interface chatStore {
  selectChatRoom: ChatRoomList | null;
  setChatRoomSelect: (chat: any) => void;
  chatView: boolean;
  setChatView: (state: boolean) => void;
  newChatsList: NewChatsList | null;
  setNewChatsList: (newChat: Chat) => void;
}

export const useChatStore = create<chatStore>((set, get) => ({
  selectChatRoom: null,
  chatView: false,
  newChatsList: null,
  setChatView: (state) => {
    if (!state) {
      set({ selectChatRoom: null });
    }
    set({ chatView: state });
  },
  setChatRoomSelect: (chatRoom: ChatRoomList) =>
    set({ selectChatRoom: chatRoom }),
  setNewChatsList: (newChat) => {
    const { newChatsList } = get();

    console.log(newChatsList);

    set({
      newChatsList: {
        ...newChatsList,
        [newChat.id]: newChatsList
          ? [newChat, ...newChatsList[newChat.id]]
          : [newChat],
      },
    });
  },
}));

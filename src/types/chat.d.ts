export interface ChatRoom extends SelectChatRoom {
  unreadCount: number;
  lastChat: {
    chatRoomId: string;
    id: string;
    sender: {
      lecturerId: 0;
      userId: 0;
    };
    receiver: {
      lecturerId: 0;
      userId: 0;
    };
    content: string;
    imageUrl?: string;
    readedAt: Date;
    createdAt: Date;
  };
}

export interface SelectChatRoom {
  id?: string;
  userId: number;
  lecturerId: number;
  roomId?: string;
}

export interface onlineState {
  lastLogin?: string;
}

export interface sendChatParams {
  chatRoomId: string;
  receiverId: number;
  content: string;
}

export interface Chat {
  id: string;
  sender:
    | {
        userId: number;
        lecturerId: null;
      }
    | {
        userId: null;
        lecturerId: number;
      };
  receiver:
    | {
        userId: number;
        lecturerId: null;
      }
    | {
        userId: null;
        lecturerId: number;
      };
  content: string;
  readedAt: Date;
  createdAt: Date;
  chatRoomId: string;
}

export interface NewChatsList {
  [key: string]: Chat[];
}

export interface ChatPagesData {
  pages: { chats: Chat[]; totalItemCount: number }[];
  pageParams: string[];
}

export interface OpponentInfo {
  id: number;
  nickname: string;
  profilImg: string;
}

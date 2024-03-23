export interface ChatRoom {
  id?: string;
  userId: number;
  lecturerId: number;
  roomId?: string;
  unreadCount?: number;
  lastChat?: {
    chatRoomId: string;
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
    imageUrl?: string;
    readedAt: Date;
    createdAt: Date;
  };
}

export interface onlineState {
  lastLogin?: string;
}

export interface sendChatParams {
  chatRoomId?: string;
  receiverId: number;
  content?: string;
  imageUrl?: string;
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
  imageUrl?: string;
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

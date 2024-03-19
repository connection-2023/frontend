export interface ChatRoom {
  id: string;
  userId: number;
  lecturerId: number;
  roomId: string;
  lastChatDateTime: string;
  unreadCount: number;
}

export interface ChatRoomList extends ChatRoom {}

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
  chattingRoomId: string;
}

export interface NewChatsList {
  [key: string]: Chat[];
}

export interface ChatPagesData {
  pages: { chats: Chat[]; totalItemCount: number }[];
  pageParams: string[];
}

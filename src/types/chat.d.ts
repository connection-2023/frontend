export interface ChatRoom {
  id: string;
  userId: number;
  lecturerId: number;
  roomId: string;
  lastChatDateTime: string;
  unreadCount: number;
}

export interface ChatRoomList extends ChatRoom {}

export interface onlineList {
  lecturerId?: number;
  userId?: number;
}

export interface sendChatParams {
  chatRoomId: string;
  receiverId: number;
  content: string;
}

export interface Chat {
  id: string;
  sender: {
    userId: number;
  };
  receiver: {
    lecturerId: number;
  };
  content: string;
  readedAt: Date;
  createdAt: Date;
}

export interface NewChatsList {
  [key: string]: Chat[];
}

export interface ChatPagesData {
  pages: Chat[][];
  pageParams: string[];
}

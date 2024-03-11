export interface ChatRoom {
  id: number;
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

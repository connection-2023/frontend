export interface ChatRoom {
  id: number;
  userId: number;
  lecturerId: number;
  roomId: string;
  lastChatDateTime: string;
  unreadCount: number;
}

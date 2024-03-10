export interface ChatRoom {
  id: string;
  userId: number;
  lecturerId: number;
  roomId: string;
  lastChatDateTime: string;
  unreadCount: number;
}

export interface ChatRoom {
  id?: string;
  user: { id: number; participation: boolean };
  lecturer: { id: number; participation: boolean };
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
  nickname?: string;
  profilImg?: string;
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
  profileImg: string;
}

interface UserData {
  createdAt: Date;
  lecturerId: number | null;
  userId: number | null;
  socketId: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface JoinUserData extends UserData {
  lastLogin: Date | null;
}

export interface ExitUserData extends UserData {
  lastLogin: Date;
}

interface ContentWithImage {
  content?: string;
  imageUrl: string;
  error: boolean;
}

interface ImageWithContent {
  content: string;
  imageUrl?: string;
  error: boolean;
}

export type SendChatPreview = ContentWithImage | ImageWithContent | null;

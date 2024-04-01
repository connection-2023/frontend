import { userType } from '@/types/auth';
import { Chat, ChatRoom, OpponentInfo, sendChatParams } from '@/types/chat';
import { FetchError } from '@/types/types';

export const getChatSocketRoomsId = async (id: string): Promise<string[]> => {
  try {
    const response = await fetch(`/api/chat/socket-rooms?id=${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.rooms;
  } catch (error) {
    console.error('채팅방 소켓 룸 id 조회 에러', error);
    throw error;
  }
};

export const getCheckTargetId = async (
  id: number | string,
  targetId: number | string,
): Promise<ChatRoom> => {
  try {
    const response = await fetch(
      `/api/chat/check-room?id=${id}&targetId=${targetId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      if (error.status !== 404) {
        console.error('상대방 채팅방 유무 조회 오류', error);
      }

      throw error;
    }

    const resData = await response.json();

    return resData.data.chatRoom;
  } catch (error) {
    throw error;
  }
};

export const createNewChatRoom = async (
  id: number | string,
  targetId: number | string,
): Promise<ChatRoom> => {
  try {
    const response = await fetch(`/api/chat/create-chat-room?id=${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.chatRoom;
  } catch (error) {
    console.error('채팅방 생성 오류', error);
    throw error;
  }
};

export const getChatRoomList = async (id: string): Promise<ChatRoom[]> => {
  try {
    const response = await fetch(`/api/chat/get-chat-rooms?id=${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      if (error.status === 404) {
        return [];
      }
      throw error;
    }

    const resData = await response.json();

    return resData.data.chatRoom ?? [];
  } catch (error) {
    console.error('채팅방 목록 조회 에러', error);
    throw error;
  }
};

export const getCheckOnline = async (
  idType: userType,
  id: number,
): Promise<Date | string> => {
  try {
    const response = await fetch(`/api/chat/online?${idType}=${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    const utcTime = resData.data.onlineMap?.lastLogin;
    return utcTime ? utcTime : '';
  } catch (error) {
    console.error('접속자 조회 에러', error);
    throw error;
  }
};

export const getChats = async (data: {
  chatRoomId: string;
  pageSize: number;
  lastItemId?: string;
}): Promise<{ chats: Chat[]; totalItemCount: number }> => {
  try {
    if (!data.chatRoomId) return { chats: [], totalItemCount: 0 };

    const params = new URLSearchParams();

    Object.entries(data)
      .filter(([_, v]) => v !== undefined)
      .forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((value) => params.append(`${k}[]`, value));
        } else {
          params.append(k, String(v));
        }
      });

    const response = await fetch(`/api/chat/get-chat?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      if (error.status === 404) {
        return { chats: [], totalItemCount: 0 };
      }
      throw error;
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error('채팅 조회 에러', error);
    throw error;
  }
};

export const sendChat = async (
  data: sendChatParams,
  userType: userType,
): Promise<Chat> => {
  try {
    if (!data.chatRoomId) {
      throw 'chatRoomId undefined';
    }

    const response = await fetch(`/api/chat/send-chat?userType=${userType}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.chat;
  } catch (error) {
    console.error('채팅 전송 오류', error);
    throw error;
  }
};

export const getOpponentInfo = async (
  userType: userType,
  id: number,
): Promise<OpponentInfo> => {
  const url =
    userType === 'lecturer'
      ? `/api/post/instructor?id=${id}`
      : `/api/users/get-info?userId=${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    const isLecturer = userType === 'lecturer';
    const profileBase = isLecturer
      ? resData.data.lecturerProfile
      : resData.data.user;
    const profileImg = isLecturer
      ? profileBase.lecturerProfileImageUrl[0].url
      : profileBase.userProfileImage?.imageUrl;

    return {
      id: profileBase.id,
      nickname: profileBase.nickname,
      profileImg,
    };
  } catch (error) {
    console.error('프로필 조회 에러', error);
    throw error;
  }
};

export const readChat = async (chatRoom: ChatRoom): Promise<ChatRoom> => {
  try {
    const response = await fetch(
      `/api/chat/read-chat?chatRoomId=${chatRoom.id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    return chatRoom;
  } catch (error) {
    console.error('채팅 읽음 처리 오류', error);
    throw error;
  }
};

export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await fetch(`/api/chat/get-unread-count`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.totalUnreadCount;
  } catch (error) {
    console.error('안읽은 채팅 수 전체 조회 에러', error);
    throw error;
  }
};

export const exitChatRoom = async (chatRoomId?: string): Promise<ChatRoom> => {
  try {
    if (!chatRoomId) {
      throw 'chatRoomId undefined';
    }

    const response = await fetch(
      `/api/chat/exit-chat-room?chatRoomId=${chatRoomId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.updatedChatRoom;
  } catch (error) {
    console.error('채팅방 나가기 오류', error);
    throw error;
  }
};

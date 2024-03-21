import { userType } from '@/types/auth';
import { Chat, ChatRoom, OpponentInfo, sendChatParams } from '@/types/chat';
import { instructorPostResponse } from '@/types/instructor';
import { FetchError } from '@/types/types';

export const getChatSocketRoomsId = async (
  userType: userType,
  id: string,
): Promise<string[]> => {
  try {
    const response = await fetch(
      `/api/chat/socket-rooms?userType=${userType}&id=${id}`,
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
      throw error;
    }

    const resData = await response.json();

    return resData.data.chatRoom;
  } catch (error) {
    console.error('상대방 채팅방 유무 조회 오류', error);
    throw error;
  }
};

export const createNewChatRoom = async (
  userType: userType,
  id: number | string,
  targetId: number | string,
): Promise<ChatRoom> => {
  try {
    const response = await fetch(
      `/api/chat/create-chat-room?userType=${userType}&id=${id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetId }),
      },
    );

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

export const getChatRoomList = async (
  userType: userType,
  id: string,
): Promise<ChatRoom[]> => {
  try {
    const response = await fetch(
      `/api/chat/get-chat-rooms?userType=${userType}&id=${id}`,
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
      throw error;
    }

    const resData = await response.json();

    return resData.data.chatRoom;
  } catch (error) {
    console.error('채팅방 목록 조회 에러', error);
    throw error;
  }
};

export const getCheckOnline = async (
  idType: 'lecturerId' | 'userId',
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
  idType: 'lecturerId' | 'userId',
  id: number,
): Promise<OpponentInfo> => {
  const url =
    idType === 'lecturerId'
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

    return idType === 'lecturerId'
      ? {
          id: resData.data.lecturerProfile.id,
          nickname: resData.data.lecturerProfile.nickname,
          profilImg:
            resData.data.lecturerProfile.lecturerProfileImageUrl[0].url,
        }
      : {
          id: resData.data.user.id,
          nickname: resData.data.user.nickname,
          profilImg: resData.data.user.userProfileImage?.imageUrl,
        };
  } catch (error) {
    console.error('프로필 조회 에러', error);
    throw error;
  }
};

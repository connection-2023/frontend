import { userType } from '@/types/auth';
import { ChatRoom } from '@/types/chat';
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
  userType: userType,
  id: number | string,
  targetId: number | string,
): Promise<ChatRoom> => {
  try {
    const response = await fetch(
      `/api/chat/check-room?userType=${userType}&id=${id}&targetId=${targetId}`,
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

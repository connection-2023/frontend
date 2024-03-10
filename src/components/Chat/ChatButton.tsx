'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { createNewChatRoom, getCheckTargetId } from '@/lib/apis/chatApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { userType } from '@/types/auth';
import { FetchError } from '@/types/types';

interface ChatButtonProps {
  targetId: number;
  children: React.ReactNode;
  btnClassName?: string;
}

const ChatButton = ({ targetId, children, btnClassName }: ChatButtonProps) => {
  const { userType, authUser } = useUserStore((state) => ({
    userType: state.userType,
    authUser: state.authUser,
  }));
  const route = useRouter();

  const moveLogin = () => {
    if (
      confirm(`로그인이 필요한 서비스입니다.
로그인 화면으로 이동하시겠습니까?
            `)
    )
      return route.push('/login');
  };

  return (
    <button
      className={btnClassName}
      onClick={() =>
        !userType || !authUser
          ? moveLogin()
          : startChat({ userType, id: authUser.id, targetId })
      }
    >
      {children}
    </button>
  );
};

export default ChatButton;

interface IstartChat {
  userType: userType;
  id: string;
  targetId: number;
}

const startChat = async (info: IstartChat) => {
  try {
    const chatInfo = await checkChatRoom(info);

    if (chatInfo) {
      console.log(chatInfo);
      // 있을때 로직
    } else {
      await createChatRoom(info);
    }
  } catch (error) {
    toast.error('잠시 후 다시 시도해주세요.');
  }
};

const checkChatRoom = async ({ userType, id, targetId }: IstartChat) => {
  try {
    return await getCheckTargetId(userType, id, targetId);
  } catch (error) {
    if (error instanceof Error) {
      const fetchError = error as FetchError;
      switch (fetchError.status) {
        case 404:
          return;
        case 401:
          try {
            await accessTokenReissuance();
            return await getCheckTargetId(userType, id, targetId);
          } catch (error) {
            console.error(error);
            throw new Error('채팅 존재 여부 확인 오류');
          }
        default:
          throw error;
      }
    } else {
      console.error(error);
      throw new Error('채팅 존재 여부 확인 오류');
    }
  }
};

const createChatRoom = async ({ userType, id, targetId }: IstartChat) => {
  try {
    await createNewChatRoom(userType, id, targetId);
  } catch (error) {
    console.error(error);
    throw new Error('채팅방 생성 오류');
  }
};

'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { getCheckTargetId } from '@/lib/apis/chatApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useChatStore, useUserStore } from '@/store';
import { reloadToast } from '@/utils/reloadMessage';
import { userType } from '@/types/auth';
import { FetchError } from '@/types/types';

interface ChatButtonProps {
  targetId: number;
  targetType: userType;
  children: React.ReactNode;
  btnClassName?: string;
}
const ChatButton = ({
  targetId,
  targetType,
  children,
  btnClassName,
}: ChatButtonProps) => {
  const { setChatRoomSelect, setChatView } = useChatStore((state) => ({
    setChatRoomSelect: state.setChatRoomSelect,
    setChatView: state.setChatView,
  }));

  const { userType, authUser } = useUserStore((state) => ({
    userType: state.userType,
    authUser: state.authUser,
  }));
  const route = useRouter();

  const { mutate: startChatMutation } = useMutation({
    mutationFn: ({ id, targetId }: { id: number | string; targetId: number }) =>
      getCheckTargetId(id, targetId),
    onSuccess: (data) => {
      setChatView(true);
      setChatRoomSelect(data);
    },
    onError: async (error, variables) => {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        switch (fetchError.status) {
          case 401:
            try {
              await accessTokenReissuance();
              startChatMutation(variables);
            } catch (error) {
              reloadToast(
                '세션이 만료되었습니다. 다시 로그인해주세요.',
                'error',
              );
            }
            break;
          case 404:
            setChatView(true);

            setChatRoomSelect({
              user: {
                id: userType === 'user' ? parseInt(authUser!.id, 10) : targetId,
                participation: false,
              },
              lecturer: {
                id: userType === 'user' ? targetId : parseInt(authUser!.id, 10),
                participation: false,
              },
            });

            break;
          default:
            toast.error('잠시 후 다시 시도해 주세요.');
            console.error(error);
            break;
        }
      }
    },
  });

  const moveLogin = () => {
    if (
      confirm(`로그인이 필요한 서비스입니다.
로그인 화면으로 이동하시겠습니까?
            `)
    )
      return route.push('/login');
  };

  const handleChatStart = () => {
    if (!userType || !authUser) {
      moveLogin();
    } else {
      startChatMutation({ id: authUser.id, targetId });
    }
  };

  if (targetType === userType) return null;

  return (
    <button className={btnClassName} onClick={handleChatStart}>
      {children}
    </button>
  );
};

export default ChatButton;

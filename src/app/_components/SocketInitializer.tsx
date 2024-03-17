'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChatStore, useSocketStore } from '@/store';
import { userType } from '@/types/auth';
import { Chat, ChatPagesData } from '@/types/chat';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT ?? '';

interface SocketInitializerProps {
  userType: userType | null;
  rooms: string[] | null;
  userId?: string;
}

const SocketInitializer = ({
  userType,
  rooms,
  userId,
}: SocketInitializerProps) => {
  const { socket, isConnected, setSocket, setIsConnected, setOnlineList } =
    useSocketStore((state) => ({
      socket: state.socket,
      isConnected: state.isConnected,
      setSocket: state.setSocket,
      setIsConnected: state.setIsConnected,
      setOnlineList: state.setOnlineList,
    }));

  const { setNewChat } = useChatStore((state) => ({
    setNewChat: state.setNewChat,
  }));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userType && !isConnected) {
      const socket = io(`${END_POINT}/chatroom1`);

      socket.on('connect', () => {
        setIsConnected(true);
        setSocket(socket);
        console.log('socket 연결');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        setSocket(null);
        console.log('socket 해제');
      });

      socket.on('joinUser', (data) => {
        const { lecturerId, userId } = data;

        const id = userId ? userId : lecturerId;
        const type = userId ? 'user' : 'lecturer';

        setOnlineList({ type, id });
      });

      socket.on('exitUser', (data) => {
        const { lecturerId, userId } = data;

        const id = userId ? userId : lecturerId;
        const type = userId ? 'user' : 'lecturer';

        setOnlineList({ type, id, join: false });
      });

      socket.on('messageToClient', (newChat: Chat) => {
        // 추후 newChat.roomid로 변경
        queryClient.setQueryData<ChatPagesData>(
          ['chats', '65ed74f7f9f7e0a52334c7ad'],
          (data) => {
            if (!data) {
              return {
                pages: [[{ ...newChat }]],
                pageParams: [''],
              };
            }

            const newParams = ['', ...data.pageParams];
            const newPages = [[{ ...newChat }], ...data.pages];
            newParams[1] = newPages[1][0].id;

            return {
              pages: newPages,
              pageParams: newParams,
            };
          },
        );

        setNewChat({ ...newChat, createdAt: new Date() });
      });

      socket.emit('login', {
        rooms,
        authorizedData:
          userType === 'user' ? { userId } : { lecturerId: userId },
      });

      return () => {
        socket.disconnect();
      };
    } else if (!userType && socket) {
      socket.disconnect();
    }
  }, [userType]);

  return null;
};

export default SocketInitializer;

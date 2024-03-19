'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChatStore, useSocketStore } from '@/store';
import { userType } from '@/types/auth';
import { ChatPagesData, Chat } from '@/types/chat';

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
  const { socket, isConnected, setSocket, setIsConnected } = useSocketStore(
    (state) => ({
      socket: state.socket,
      isConnected: state.isConnected,
      setSocket: state.setSocket,
      setIsConnected: state.setIsConnected,
    }),
  );

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
        const type = userId ? 'userId' : 'lecturerId';

        queryClient.setQueryData(['onlineState', type, id], () => {
          return null;
        });
      });

      socket.on('exitUser', (data) => {
        const { lecturerId, userId } = data;

        const id = userId ? userId : lecturerId;
        const type = userId ? 'userId' : 'lecturerId';

        queryClient.setQueryData(['onlineState', type, id], () => {
          return new Date(data.lastLogin);
        });
      });

      socket.on('messageToClient', (newChat: Chat) => {
        queryClient.setQueryData<ChatPagesData>(
          ['chats', newChat.chattingRoomId],
          (data) => {
            if (!data) {
              return {
                pages: [{ chats: [{ ...newChat }], totalItemCount: 1 }],
                pageParams: [''],
              };
            }
            const { pages }: ChatPagesData = data;

            const allChats = [newChat, ...pages.flatMap(({ chats }) => chats)];

            const newPages = [];
            for (let i = 0; i < allChats.length; i += 12) {
              newPages.push({
                chats: allChats.slice(i, i + 12),
                totalItemCount: pages[0].totalItemCount,
              });
            }

            const newPageParams = newPages.map((page, index) =>
              index === 0 ? '' : page.chats[page.chats.length - 1].id,
            );

            return {
              pages: newPages,
              pageParams: newPageParams,
            };
          },
        );

        setNewChat({ ...newChat });
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

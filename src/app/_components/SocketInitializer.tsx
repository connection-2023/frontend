'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { CHATS_TAKE } from '@/constants/constants';
import { useChatStore, useSocketStore } from '@/store';
import { userType } from '@/types/auth';
import {
  ChatPagesData,
  Chat,
  ChatRoom,
  JoinUserData,
  ExitUserData,
} from '@/types/chat';

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
  const { isConnected, setSocket, setIsConnected } = useSocketStore(
    (state) => ({
      isConnected: state.isConnected,
      setSocket: state.setSocket,
      setIsConnected: state.setIsConnected,
    }),
  );

  const { setNewChat, setChatRoomSelect } = useChatStore((state) => ({
    setNewChat: state.setNewChat,
    setChatRoomSelect: state.setChatRoomSelect,
  }));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userType && !isConnected) {
      const socket = io(`${END_POINT}/chatroom1`);

      socket.on('connect', () => {
        setIsConnected(true);
        setSocket(socket);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        setSocket(null);
      });

      socket.on('joinUser', (data: JoinUserData) => {
        const { lecturerId, userId } = data;

        const id = userId ? userId : lecturerId;
        const type = userId ? 'userId' : 'lecturerId';

        queryClient.setQueryData(['onlineState', type, id], () => {
          return null;
        });
      });

      socket.on('exitUser', (data: ExitUserData) => {
        if (!data) {
          console.error('exitUser data is null');
          return;
        }

        const { lecturerId, userId } = data;

        const id = userId ? userId : lecturerId;
        const type = userId ? 'userId' : 'lecturerId';

        queryClient.setQueryData(['onlineState', type, id], () => {
          return new Date(data.lastLogin);
        });
      });

      socket.on('handleNewChatRoom', (newChatRoomId: string) => {
        socket.emit('login', {
          rooms: rooms ? [...rooms, newChatRoomId] : [newChatRoomId],
          authorizedData:
            userType === 'user' ? { userId } : { lecturerId: userId },
        });
      });

      socket.on('messageToClient', (newChat: Chat) => {
        setNewChat({ ...newChat });

        const hasChatsQuery = queryClient.getQueryData([
          'chats',
          newChat.chatRoomId,
        ]);

        if (hasChatsQuery) {
          updateChatPagesData(newChat);
        }

        const receiverId = (newChat.receiver.userId ||
          newChat.receiver.lecturerId) as number;
        const isReceiver = receiverId === Number(userId);

        if (isReceiver) {
          queryClient.setQueryData<number>(['commentCount'], (totalCount) => {
            return totalCount ? totalCount + 1 : 1;
          });
        }

        const hasChatListQuery = queryClient.getQueryData([
          'chatRoomList',
          userId,
        ]);

        if (hasChatListQuery) {
          updateChatRoomList(newChat, isReceiver);
        }
      });

      socket.emit('login', {
        rooms,
        authorizedData:
          userType === 'user' ? { userId } : { lecturerId: userId },
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userType]);

  const updateChatPagesData = (newChat: Chat) => {
    queryClient.setQueryData<ChatPagesData>(
      ['chats', newChat.chatRoomId],
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
        for (let i = 0; i < allChats.length; i += CHATS_TAKE) {
          newPages.push({
            chats: allChats.slice(i, i + CHATS_TAKE),
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
  };

  const updateChatRoomList = (newChat: Chat, isReceiver: boolean) => {
    const targetChatRoomIndex = queryClient
      .getQueryData<ChatRoom[]>(['chatRoomList', userId])
      ?.findIndex((chatRoom) => chatRoom.id === newChat.chatRoomId);

    if (typeof targetChatRoomIndex === 'number' && targetChatRoomIndex !== -1) {
      queryClient.setQueryData<ChatRoom[]>(
        ['chatRoomList', userId],
        (oldData) => {
          if (!oldData) return oldData;

          const targetChatRoom = oldData[targetChatRoomIndex];

          const updatedChatRoom: ChatRoom = {
            ...targetChatRoom,
            unreadCount: !isReceiver
              ? targetChatRoom.unreadCount
              : targetChatRoom.unreadCount && targetChatRoom.unreadCount > 0
              ? targetChatRoom.unreadCount + 1
              : 1,
            lastChat: targetChatRoom.lastChat
              ? {
                  ...targetChatRoom.lastChat,
                  imageUrl: newChat?.imageUrl,
                  content: newChat.content,
                  createdAt: newChat.createdAt,
                }
              : undefined,
          };

          const updatedData = [...oldData];
          updatedData.splice(targetChatRoomIndex, 1);
          updatedData.unshift(updatedChatRoom);

          return updatedData;
        },
      );
    } else {
      const newChatRoom: ChatRoom = {
        id: newChat.chatRoomId,
        user: {
          id: newChat.receiver.userId || (newChat.sender.userId as number),
          participation: true,
        },
        lecturer: {
          id:
            newChat.receiver.lecturerId ||
            (newChat.sender.lecturerId as number),
          participation: true,
        },
        unreadCount: isReceiver ? 1 : undefined,
        lastChat: {
          ...newChat,
        },
      };

      queryClient.setQueryData<ChatRoom[]>(
        ['chatRoomList', userId],
        (oldData) => {
          if (!oldData) return [{ ...newChatRoom }];

          return [{ ...newChatRoom }, ...oldData];
        },
      );

      setChatRoomSelect({ ...newChatRoom });
    }
  };

  return null;
};

export default SocketInitializer;

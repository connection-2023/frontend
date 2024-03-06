import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getChatSocketRoomsId } from '@/lib/apis/chatApi';
import { useSocketStore } from '@/store';
import ChatHeader from './ChatHeader';
import { userType } from '@/types/auth';

interface ChatProps {
  userId: string;
  userType: userType;
}

const Chat = ({ userId, userType }: ChatProps) => {
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));

  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['socket', userType, userId],
    queryFn: () => getChatSocketRoomsId(userType, userId),
  });

  if (isLoading) return '로딩중';

  console.log(rooms);

  socket?.emit('login', {
    rooms,
    authorizedData: userType === 'user' ? { userId } : { lecturerId: userId },
  });

  return <ChatHeader />;
};

export default Chat;

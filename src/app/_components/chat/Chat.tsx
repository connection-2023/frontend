import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getChatSocketRoomsId } from '@/lib/apis/chatApi';
import ChatHeader from './ChatHeader';
import { userType } from '@/types/auth';

interface ChatProps {
  userId: string;
  userType: userType;
}

const Chat = ({ userId, userType }: ChatProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['socket', userType, userId],
    queryFn: () => getChatSocketRoomsId(userType, userId),
  });

  console.log(data);

  return <ChatHeader />;
};

export default Chat;

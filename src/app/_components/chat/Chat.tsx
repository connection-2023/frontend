import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getChatSocketRoomsId } from '@/lib/apis/chatApi';
import { useSocketStore } from '@/store';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { userType } from '@/types/auth';

interface ChatProps {
  userId: string;
  userType: userType;
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({ userId, userType, StartChatPositionDrag }: ChatProps) => {
  const [chatSelect, setchatSelect] = useState<number | null>(null);
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

  if (isLoading) return '로딩중'; // 추후 수정

  const chatSelectHandler = (id: number) => {
    setchatSelect(id);
  };

  socket?.emit('login', {
    rooms,
    authorizedData: userType === 'user' ? { userId } : { lecturerId: userId },
  });

  return (
    <div onPointerDown={(e) => e.stopPropagation()}>
      <ChatHeader StartChatPositionDrag={StartChatPositionDrag} />
      <div className="flex gap-3 sm:h-[625px]">
        <ChatList chatSelectHandler={chatSelectHandler} />
        {chatSelect && <ChatRoom />}
      </div>
    </div>
  );
};

export default Chat;

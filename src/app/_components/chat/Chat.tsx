import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

interface ChatProps {
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({ StartChatPositionDrag }: ChatProps) => {
  const [chatSelect, setchatSelect] = useState<number | null>(null);

  const chatSelectHandler = (id: number) => {
    setchatSelect(id);
  };

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
